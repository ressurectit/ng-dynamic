import {ComponentRef, Directive, effect, inject, OnDestroy, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {applyPositionResult, getHostElement, Position, POSITION, PositionPlacement} from '@anglr/common';
import {BindThis, renderToBody} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {LayoutDesignerLayoutComponent} from '../../components/layoutDesignerLayout/layoutDesignerLayout.component';
import {DYNAMIC_BODY_CONTAINER} from '../../misc/constants';

/**
 * Directive used for displaying layout designer overlay
 */
@Directive(
{
    selector: '[layoutDesignerOverlay]',
})
export class LayoutDesignerOverlayDirective implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subject used for emitting remove component event
     */
    protected removeSubject: Subject<void> = new Subject<void>();

    /**
     * Instance of overlay div element
     */
    protected overlayDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of title div element
     */
    protected titleDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of remove btn div element
     */
    protected removeBtnDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of over element div element
     */
    protected overComponentDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of over container div element
     */
    protected overContainerDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of layout component displaying layout overlay
     */
    protected layoutComponent: ComponentRef<LayoutDesignerLayoutComponent>|undefined|null;

    /**
     * Subscription for position changes for over element div
     */
    protected overComponentPositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for over container div
     */
    protected overContainerPositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for overlay div
     */
    protected overlayPositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for title
     */
    protected titlePositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for remove button
     */
    protected removeBtnPositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for layout overlay
     */
    protected layoutOverlayPositionSubscriptions: Subscription|undefined|null;

    /**
     * Instance of resize observer watching for changes of component
     */
    protected resizeObserver: ResizeObserver|undefined|null;

    /**
     * Instance of mutation observer watching for style changes of component
     */
    protected styleObserver: MutationObserver|undefined|null;

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

    /**
     * Instance of view container ref used for creating dynamic content
     */
    protected viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

    /**
     * Service used for absolute positioning
     */
    protected position: Position<HTMLElement> = inject<Position<HTMLElement>>(POSITION);

    /**
     * Instance of HTML document
     */
    protected document: Document = inject(DOCUMENT);

    //######################### public properties #########################

    /**
     * Occurs when user is trying to remove component
     */
    public get remove(): Observable<void>
    {
        return this.removeSubject.asObservable();
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.hideOverlay();
        this.hideOverContainer();
        this.hideOverComponent();
    }

    //######################### public methods #########################

    /**
     * Initialize overlay
     */
    public initialize(): void
    {
        effect(() =>
        {
            if(this.common.dndBus.dragOverComponentId() === this.common.designer.metadataSafe.id)
            {
                this.showOverComponent();
            }
            else
            {
                this.hideOverComponent();
            }
        }, {injector: this.common.injector});

        effect(() =>
        {
            if(this.common.dndBus.dragOverContainerId() === this.common.designer.metadataSafe.id)
            {
                this.showOverContainer();
            }
            else
            {
                this.hideOverContainer();
            }
        }, {injector: this.common.injector});
    }

    /**
     * Displays designer overlay
     * @param title - Title for displaying component
     */
    public showOverlay(title: string): void
    {
        //TODO: cleanup title, take it from designer

        this.overlayDiv = this.document.createElement('div');
        this.overlayDiv.classList.add('designer-overlay-border');
        
        renderToBody(this.document, this.overlayDiv, DYNAMIC_BODY_CONTAINER);

        this.updateBorderPosition();

        this.resizeObserver = new ResizeObserver(changes =>
        {
            for(const change of changes)
            {
                if(change.target != this.common.element.nativeElement || !this.overlayDiv)
                {
                    continue;
                }

                //update border
                this.updateBorderPosition();

                //update layout
                const computedStyles = getComputedStyle(this.common.element.nativeElement);

                this.updateLayoutPosition(computedStyles);
            }
        });

        this.resizeObserver.observe(this.common.element.nativeElement);

        this.styleObserver = new MutationObserver(() => 
        {
            const computedStyles = getComputedStyle(this.common.element.nativeElement);

            this.updateLayoutPosition(computedStyles);
            this.updateBorderPosition();
        });

        this.styleObserver.observe(this.common.element.nativeElement, {attributeFilter: ['style']});

        this.common.element.nativeElement.addEventListener('transitionend', this.transitionEndHandler);

        this.showTitle(title);
        this.showRemoveBtn();
        this.showLayout();
    }

    /**
     * Hides designer overlay
     */
    public hideOverlay(): void
    {
        this.common.element.nativeElement.removeEventListener('transitionend', this.transitionEndHandler);
        this.overlayPositionSubscriptions?.unsubscribe();
        this.overlayPositionSubscriptions = null;
        this.overlayDiv?.remove();
        this.overlayDiv = null;
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
        this.hideTitle();
        this.hideRemoveBtn();
        this.hideLayout();
    }

    /**
     * Updates component title
     * @param title - Title to be updated
     */
    public updateTitle(title: string): void
    {
        if(this.titleDiv)
        {
            this.titleDiv.innerText = title;
        }
    }

    //######################### protected methods #########################

    /**
     * Shows overlay title for component
     * @param title - Title to be displayed
     */
    protected showTitle(title: string): void
    {
        this.titleDiv = this.document.createElement('div');
        this.titleDiv.classList.add('designer-overlay-title');
        this.titleDiv.innerText = title;

        renderToBody(this.document, this.titleDiv, DYNAMIC_BODY_CONTAINER);

        this.titlePositionSubscriptions = this.position.placeElement(this.titleDiv, this.common.element.nativeElement, {autoUpdate: true}).subscribe(applyPositionResult);
    }

    /**
     * Hides overlay title for component
     */
    protected hideTitle(): void
    {
        this.titleDiv?.remove();
        this.titleDiv = null;
        this.titlePositionSubscriptions?.unsubscribe();
        this.titlePositionSubscriptions = null;
    }

    /**
     * Shows remove btn for component
     */
    protected showRemoveBtn(): void
    {
        if(!this.common.designer.parent || !this.common.designer.parent.editorMetadata.metadata?.removeDescendant)
        {
            return;
        }

        this.removeBtnDiv = this.document.createElement('div');
        this.removeBtnDiv.classList.add('designer-overlay-remove');

        const button = this.document.createElement('a');
        const icon = this.document.createElement('span');
        icon.classList.add('far', 'fa-trash-can');

        button.appendChild(icon);
        this.removeBtnDiv.appendChild(button);
        this.common.element.nativeElement.append(this.removeBtnDiv);

        button.addEventListener('click', this.removeComponent);

        this.removeBtnPositionSubscriptions = this.position.placeElement(this.removeBtnDiv, this.common.element.nativeElement, {autoUpdate: true, placement: PositionPlacement.TopEnd, offset: {mainAxis: -19, crossAxis: -2}}).subscribe(applyPositionResult);
    }

    /**
     * Hides remove button for component
     */
    protected hideRemoveBtn(): void
    {
        this.removeBtnDiv?.querySelector('button')?.removeEventListener('click', this.removeComponent);
        this.removeBtnDiv?.remove();
        this.removeBtnDiv = null;
        this.removeBtnPositionSubscriptions?.unsubscribe();
        this.removeBtnPositionSubscriptions = null;
    }

    /**
     * Removes component from tree
     */
    @BindThis
    protected removeComponent(): void
    {
        this.removeSubject.next();
    }

    /**
     * Shows layout overlay
     */
    protected showLayout(): void
    {
        this.layoutComponent = this.viewContainerRef.createComponent(LayoutDesignerLayoutComponent, {injector: this.common.injector});
        const element = getHostElement(this.layoutComponent);

        if(element)
        {
            renderToBody(this.document, element, DYNAMIC_BODY_CONTAINER);
            const computedStyles = getComputedStyle(this.common.element.nativeElement);
            this.updateLayoutPosition(computedStyles);
        }
    }

    /**
     * Hides layout overlay
     */
    protected hideLayout(): void
    {
        this.styleObserver?.disconnect();
        this.styleObserver = null;
        this.layoutComponent?.destroy();
        this.layoutComponent = null;
        this.layoutOverlayPositionSubscriptions?.unsubscribe();
        this.layoutOverlayPositionSubscriptions = null;
    }

    /**
     * Shows over component overlay
     */
    protected showOverComponent(): void
    {
        this.hideOverComponent();

        const element = this.common.element.nativeElement;
        this.overComponentDiv = this.document.createElement('div');
        const computedStyles = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const marginLeft = +computedStyles.marginLeft.replace('px', '');
        const marginBottom = +computedStyles.marginBottom.replace('px', '');
        const marginTop = +computedStyles.marginTop.replace('px', '');
        const marginRight = +computedStyles.marginRight.replace('px', '');

        this.overComponentDiv.style.width = `${rect.width + marginLeft + marginRight}px`;
        this.overComponentDiv.style.height = `${rect.height + marginTop + marginBottom}px`;
        this.overComponentDiv.classList.add('designer-overlay-over-component');

        renderToBody(this.document, this.overComponentDiv, DYNAMIC_BODY_CONTAINER);

        this.overComponentPositionSubscriptions = this.position
            .placeElement(this.overComponentDiv, element, {autoUpdate: true, offset: {crossAxis: -marginLeft, mainAxis: -rect.height - marginBottom}})
            .subscribe(applyPositionResult);
    }

    /**
     * Hides over component overlay
     */
    protected hideOverComponent(): void
    {
        this.overComponentPositionSubscriptions?.unsubscribe();
        this.overComponentPositionSubscriptions = null;
        this.overComponentDiv?.remove();
        this.overComponentDiv = null;
    }

    /**
     * Shows over container overlay
     */
    protected showOverContainer(): void
    {
        this.hideOverComponent();

        const element = this.common.element.nativeElement;
        this.overContainerDiv = this.document.createElement('div');
        const rect = element.getBoundingClientRect();

        const idDiv = this.document.createElement('div');
        idDiv.innerText = this.common.designer.metadataSafe.displayName || this.common.designer.metadataSafe.id;
        this.overContainerDiv.appendChild(idDiv);

        this.overContainerDiv.style.width = `${rect.width}px`;
        this.overContainerDiv.style.height = `${rect.height}px`;
        this.overContainerDiv.classList.add('designer-overlay-over-container');

        renderToBody(this.document, this.overContainerDiv, DYNAMIC_BODY_CONTAINER);

        this.overContainerPositionSubscriptions = this.position
            .placeElement(this.overContainerDiv, element, {autoUpdate: true, offset: {mainAxis: -rect.height}})
            .subscribe(applyPositionResult);
    }

    /**
     * Hides over container overlay
     */
    protected hideOverContainer(): void
    {
        this.overContainerPositionSubscriptions?.unsubscribe();
        this.overContainerPositionSubscriptions = null;
        this.overContainerDiv?.remove();
        this.overContainerDiv = null;
    }

    /**
     * Updates layout dimensions
     * @param computedStyles - Current value of computed styles
     * @param element - Element which layout should be updated
     */
    protected updateLayoutDimensions(element: HTMLElement, computedStyles: CSSStyleDeclaration): void
    {
        element.style.width = `calc(${computedStyles.marginLeft} + ${this.common.element.nativeElement.offsetWidth}px + ${computedStyles.marginRight})`;
        element.style.height = `calc(${computedStyles.marginTop} + ${this.common.element.nativeElement.offsetHeight}px + ${computedStyles.marginBottom})`;
    }

    /**
     * Updates layout position
     * @param computedStyles - Current value of computed styles
     */
    protected updateLayoutPosition(computedStyles: CSSStyleDeclaration): void
    {
        const element = getHostElement(this.layoutComponent);

        if(element)
        {
            this.updateLayoutDimensions(element, computedStyles);
    
            const marginLeft = +computedStyles.marginLeft.replace('px', '');
            const marginBottom = +computedStyles.marginBottom.replace('px', '');
    
            this.layoutOverlayPositionSubscriptions?.unsubscribe();
    
            requestIdleCallback(() =>
            {
                this.layoutOverlayPositionSubscriptions = this.position.placeElement(element,
                                                                                     this.common.element.nativeElement,
                                                                                     {
                                                                                         autoUpdate: true,
                                                                                         offset:
                                                                                         {
                                                                                             mainAxis: -marginBottom-this.common.element.nativeElement.offsetHeight,
                                                                                             crossAxis: -marginLeft
                                                                                         }
                                                                                     }).subscribe(applyPositionResult);
            });   
        }
    }

    /**
     * Updates border dimensions
     */
    protected updateBorderDimensions(): void
    {
        if(this.overlayDiv)
        {
            this.overlayDiv.style.width = `${this.common.element.nativeElement.offsetWidth}px`;
            this.overlayDiv.style.height = `${this.common.element.nativeElement.offsetHeight}px`;
        }
    }

    /**
     * Updates border position
     */
    protected updateBorderPosition(): void
    {
        this.updateBorderDimensions();
        this.overlayPositionSubscriptions?.unsubscribe();

        requestIdleCallback(() =>
        {
            if(this.overlayDiv)
            {
                this.overlayPositionSubscriptions = this.position.placeElement(this.overlayDiv, this.common.element.nativeElement, {autoUpdate: true, offset: {mainAxis: -this.common.element.nativeElement.offsetHeight}}).subscribe(applyPositionResult);
            }
        });
    }

    /**
     * Handles finished css transition
     */
    @BindThis
    protected transitionEndHandler(): void
    {
        const computedStyles = getComputedStyle(this.common.element.nativeElement);

        this.updateBorderPosition();
        this.updateLayoutPosition(computedStyles);
    }
}