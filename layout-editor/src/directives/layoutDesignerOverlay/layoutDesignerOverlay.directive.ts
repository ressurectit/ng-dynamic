import {Directive, inject, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {applyPositionResult, Position, POSITION, PositionPlacement} from '@anglr/common';
import {BindThis, renderToBody} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';

/**
 * Name of container for dynamic body elements
 */
const DYNAMIC_BODY_CONTAINER = 'div.dynamic-body-container';

/**
 * Directive used for displaying layout designer overlay
 */
@Directive(
{
    selector: '[layoutDesignerOverlay]',
    standalone: true,
})
export class LayoutDesignerOverlayDirective implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Indication whether hiding overlay is enabled
     */
    protected preventOverlayHideSignal: WritableSignal<boolean> = signal(false);

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
     * Instance of resize observer watching for changes of component
     */
    protected resizeObserver: ResizeObserver|undefined|null;

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

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
     * Gets indication whether hiding overlay is enabled
     */
    public get preventOverlayHide(): Signal<boolean>
    {
        return this.preventOverlayHideSignal.asReadonly();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.hideOverlay();
    }

    //######################### public methods #########################

    /**
     * Displays designer overlay
     * @param title - Title for displaying component
     */
    public showOverlay(title: string): void
    {
        this.overlayDiv = this.document.createElement('div');
        this.overlayDiv.classList.add('designer-overlay-border');
        this.overlayDiv.style.width = `${this.common.element.nativeElement.offsetWidth}px`;
        this.overlayDiv.style.height = `${this.common.element.nativeElement.offsetHeight}px`;

        renderToBody(this.document, this.overlayDiv, DYNAMIC_BODY_CONTAINER);

        this.overlayPositionSubscriptions = this.position.placeElement(this.overlayDiv, this.common.element.nativeElement, {autoUpdate: true, offset: {mainAxis: -this.common.element.nativeElement.offsetHeight}}).subscribe(applyPositionResult);

        this.resizeObserver = new ResizeObserver(changes =>
        {
            for(const change of changes)
            {
                if(change.target != this.common.element.nativeElement || !this.overlayDiv)
                {
                    continue;
                }

                this.overlayDiv.style.width = `${this.common.element.nativeElement.offsetWidth}px`;
                this.overlayDiv.style.height = `${this.common.element.nativeElement.offsetHeight}px`;
            }
        });

        this.resizeObserver.observe(this.common.element.nativeElement);

        this.showTitle(title);
        this.showRemoveBtn();
    }

    /**
     * Hides designer overlay
     */
    public hideOverlay(): void
    {
        this.overlayPositionSubscriptions?.unsubscribe();
        this.overlayPositionSubscriptions = null;
        this.overlayDiv?.remove();
        this.overlayDiv = null;
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
        this.hideTitle();
        this.hideRemoveBtn();
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
        this.removeBtnDiv = this.document.createElement('div');
        this.removeBtnDiv.classList.add('designer-overlay-remove');
        this.removeBtnDiv.addEventListener('mouseenter', this.removeBtnEnter);
        this.removeBtnDiv.addEventListener('mouseleave', this.removeBtnLeave);

        const button = this.document.createElement('a');
        button.innerText = 'X';

        this.removeBtnDiv.appendChild(button);

        renderToBody(this.document, this.removeBtnDiv, DYNAMIC_BODY_CONTAINER);

        this.removeBtnPositionSubscriptions = this.position.placeElement(this.removeBtnDiv, this.common.element.nativeElement, {autoUpdate: true, placement: PositionPlacement.TopEnd, offset: {mainAxis: -18}}).subscribe(applyPositionResult);
    }

    /**
     * Hides remove button for component
     */
    protected hideRemoveBtn(): void
    {
        this.removeBtnDiv?.removeEventListener('mouseenter', this.removeBtnEnter);
        this.removeBtnDiv?.removeEventListener('mouseleave', this.removeBtnLeave);
        this.removeBtnDiv?.remove();
        this.removeBtnDiv = null;
        this.removeBtnPositionSubscriptions?.unsubscribe();
        this.removeBtnPositionSubscriptions = null;
    }

    /**
     * Handles mouse enter for 'remove button'
     */
    @BindThis
    protected removeBtnEnter(): void
    {
        this.preventOverlayHideSignal.set(true);
    }

    /**
     * Handles mouse leave for 'remove button'
     */
    @BindThis
    protected removeBtnLeave(): void
    {
        this.preventOverlayHideSignal.set(false);
    }
}