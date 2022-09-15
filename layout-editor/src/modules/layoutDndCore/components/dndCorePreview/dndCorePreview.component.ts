import {Component, ChangeDetectionStrategy, EmbeddedViewRef, ContentChild, TemplateRef, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {DndService} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {DndCorePreviewTemplateContext, DndCorePreviewTemplateDirective, LayoutDragItem} from '../../directives';

/**
 * Component used for displaying drag preview
 */
@Component(
{
    selector: 'dnd-core-drag-preview',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DndCorePreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of view for drag preview
     */
    protected dragPreviewView: EmbeddedViewRef<DndCorePreviewTemplateContext>|undefined|null;

    /**
     * Instance of html element for drag preview
     */
    protected dragPreviewElement: HTMLElement|undefined|null;

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### protected properties - children #########################

    /**
     * Instance of dnd core preview template
     */
    @ContentChild(DndCorePreviewTemplateDirective, {static: true, read: TemplateRef<DndCorePreviewTemplateContext>})
    protected dndCorePreviewTemplate?: TemplateRef<DndCorePreviewTemplateContext>;

    //######################### constructor #########################
    constructor(protected viewContainer: ViewContainerRef,
                protected dnd: DndService,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.dnd
            .dragLayer<LayoutDragItem>(this.initSubscriptions)
            .listen(monitor => ({
                                    dragging: monitor.isDragging(),
                                    item: monitor.getItem(),
                                    coordinates: monitor.getClientOffset(),
                                    type: monitor.getItemType(),
                                }))
            .subscribe(itm =>
            {
                if(!itm.dragging)
                {
                    this.removeDragPreview();

                    return;
                }

                if(!itm.item)
                {
                    return;
                }

                this.dragPreviewElement ??= this.renderDragPreview(itm.item);

                if(this.dragPreviewElement)
                {
                    this.dragPreviewElement.style.position = 'fixed';
                    this.dragPreviewElement.style.top = `${itm.coordinates?.y}px`;
                    this.dragPreviewElement.style.left = `${itm.coordinates?.x}px`;
                    this.dragPreviewElement.style.zIndex = '21312';
                }
            }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
        this.removeDragPreview();
    }

    //######################### protected methods #########################
    
    /**
     * Renders drag preview and returns html element
     */
    protected renderDragPreview(dragData: LayoutDragItem): HTMLElement|null
    {
        if(!this.dndCorePreviewTemplate)
        {
            return null;
        }

        this.dragPreviewView = this.viewContainer.createEmbeddedView(this.dndCorePreviewTemplate, {$implicit: dragData});
        this.dragPreviewElement = this.dragPreviewView.rootNodes[0];
        this.dragPreviewView.detectChanges();

        return this.dragPreviewElement ?? null;
    }

    /**
     * Removes rendered drag preview
     */
    protected removeDragPreview(): void
    {
        this.dragPreviewElement?.remove();
        this.dragPreviewView?.destroy();
        this.dragPreviewElement = null;
        this.dragPreviewView = null;
    }
}