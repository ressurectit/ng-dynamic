import {Directive, ElementRef, EventEmitter, HostListener, Inject, NgZone, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BindThis, isBlank} from '@jscrpt/common';

/**
 * Directive used for resizing/changing of width
 */
@Directive(
{
    selector: '[widthResizer]',
    standalone: true,
})
export class WidthResizerSADirective
{
    /**
     * Value of last recorded x coordinate of mouse
     */
    protected lastXCoordinate: number|null = null;

    //######################### public properties - outputs #########################

    /**
     * Occurs when size changes, represents difference, positive is that X increases, negative is if x decreases
     */
    @Output()
    public size: EventEmitter<number> = new EventEmitter<number>();

    //######################### constructor #########################
    constructor(@Inject(DOCUMENT) protected document: Document,
                protected element: ElementRef<HTMLElement>,
                protected ngZone: NgZone,)
    {
    }

    //######################### protected methods - host #########################

    /**
     * Handles start of dragging
     * @param event - Mouse event that occured
     */
    @HostListener('mousedown', ['$event'])
    protected dragStart(event: MouseEvent): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.document.addEventListener('mousemove', this.drag);
            this.document.addEventListener('mouseup', this.dragEnd);
        });

        this.element.nativeElement.classList.add('hovering');

        event.stopImmediatePropagation();
        event.preventDefault();

        this.lastXCoordinate = event.clientX;
    }

    /**
     * Handles drag itself
     * @param event - Mouse event that occured
     */
    @BindThis
    protected drag(event: MouseEvent): void
    {
        if(isBlank(this.lastXCoordinate))
        {
            return;
        }

        this.size.emit(event.clientX - this.lastXCoordinate);

        event.stopImmediatePropagation();
        event.preventDefault();

        this.lastXCoordinate = event.clientX;
    }

    /**
     * Handles end of dragging
     * @param event - Mouse event that occured
     */
    @BindThis
    protected dragEnd(event: MouseEvent): void
    {
        this.ngZone.runOutsideAngular(() =>
        {
            this.document.removeEventListener('mousemove', this.drag);
            this.document.removeEventListener('mouseup', this.dragEnd);
        });

        this.element.nativeElement.classList.remove('hovering');

        event.stopImmediatePropagation();
        event.preventDefault();

        this.lastXCoordinate = null;
    }
}