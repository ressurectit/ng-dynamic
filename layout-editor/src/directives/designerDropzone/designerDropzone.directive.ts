import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {DragActiveService} from '../../services';

/**
 * Directive that adds special changes for designer dropzone
 */
@Directive(
{
    selector: '.designer-dropzone, .designer-overlay',
    standalone: true,
})
export class DesignerDropzoneSADirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### public properties - inputs #########################

    /**
     * Indication whether is this enabled drop zone
     */
    @Input()
    public isDropZone: boolean = false;

    //######################### constructor #########################
    constructor(protected draggingSvc: DragActiveService,
                protected element: ElementRef<HTMLElement>,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.draggingSvc.draggingChange.subscribe(() => this.processDragValue()));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Process drag current value and sets css classes
     */
    protected processDragValue(): void
    {
        //relate to https://stackoverflow.com/a/20734159
        //Need to wait before manipulating with DOM because browser can trigger dragend if dragged node is out of mouse position
        setTimeout(() =>
        {
            if(this.draggingSvc.dragging && this.isDropZone)
            {
                this.element.nativeElement.classList.add('drag-active');
            }
            else
            {
                this.element.nativeElement.classList.remove('drag-active');
            }
        });
    }
}