import {Directive, ElementRef, inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {applyPositionResult, Position, POSITION} from '@anglr/common';
import {renderToBody} from '@jscrpt/common';
import {Subscription} from 'rxjs';

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
     * Instance of overlay div element
     */
    protected overlayDiv: HTMLDivElement|undefined|null;

    /**
     * Instance of title div element
     */
    protected titleDiv: HTMLDivElement|undefined|null;

    /**
     * Subscription for position changes for overlay div
     */
    protected overlayPositionSubscriptions: Subscription|undefined|null;

    /**
     * Subscription for position changes for title
     */
    protected titlePositionSubscriptions: Subscription|undefined|null;

    /**
     * Instance of resize observer watching for changes of component
     */
    protected resizeObserver: ResizeObserver|undefined|null;

    /**
     * Instance of components element
     */
    protected element: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Service used for absolute positioning
     */
    protected position: Position<HTMLElement> = inject<Position<HTMLElement>>(POSITION);

    /**
     * Instance of HTML document
     */
    protected document: Document = inject(DOCUMENT);

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
        this.overlayDiv.style.width = `${this.element.nativeElement.offsetWidth}px`;
        this.overlayDiv.style.height = `${this.element.nativeElement.offsetHeight}px`;

        renderToBody(this.document, this.overlayDiv, DYNAMIC_BODY_CONTAINER);

        this.overlayPositionSubscriptions = this.position.placeElement(this.overlayDiv, this.element.nativeElement, {autoUpdate: true, offset: {mainAxis: -this.element.nativeElement.offsetHeight}}).subscribe(applyPositionResult);

        this.resizeObserver = new ResizeObserver(changes =>
        {
            for(const change of changes)
            {
                if(change.target != this.element.nativeElement || !this.overlayDiv)
                {
                    continue;
                }

                this.overlayDiv.style.width = `${this.element.nativeElement.offsetWidth}px`;
                this.overlayDiv.style.height = `${this.element.nativeElement.offsetHeight}px`;
            }
        });

        this.resizeObserver.observe(this.element.nativeElement);

        this.showTitle(title);
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

        this.titlePositionSubscriptions = this.position.placeElement(this.titleDiv, this.element.nativeElement, {autoUpdate: true}).subscribe(applyPositionResult);
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
}