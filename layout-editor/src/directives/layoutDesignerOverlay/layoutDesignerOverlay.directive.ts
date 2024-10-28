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
     * Subscription for position changes
     */
    protected positionSubscription: Subscription|undefined|null;

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
     */
    public showOverlay(): void
    {
        console.log('renderin', this.element.nativeElement);

        this.overlayDiv = this.document.createElement('div');
        this.overlayDiv.style.backgroundColor = '#aaa';
        this.overlayDiv.style.position = 'absolute';
        this.overlayDiv.style.width = `${this.element.nativeElement.clientWidth}px`;
        this.overlayDiv.style.height = `${this.element.nativeElement.clientHeight}px`;

        renderToBody(this.document, this.overlayDiv, DYNAMIC_BODY_CONTAINER);

        this.positionSubscription = this.position.placeElement(this.overlayDiv, this.element.nativeElement, {autoUpdate: true}).subscribe(applyPositionResult);
    }

    /**
     * Hides designer overlay
     */
    public hideOverlay(): void
    {
        console.log('hiding', this.element.nativeElement, this.overlayDiv);

        this.positionSubscription?.unsubscribe();
        this.positionSubscription = null;
        this.overlayDiv?.remove();
        this.overlayDiv = null;
    }
}