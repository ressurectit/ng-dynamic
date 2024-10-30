import {Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, Input, OnInit, OnDestroy, ViewChildren, QueryList, Injector, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DebounceCall, WithSync} from '@jscrpt/common';
import {DndModule} from '@ng-dnd/core';
import {Subscription, skip, timer} from 'rxjs';

import {DragActiveService, LayoutComponentsIteratorService, LayoutEditorMetadataManager} from '../../../services';
import {LayoutDndCoreModule} from '../../../modules';
import {LayoutComponentDragData} from '../../../interfaces';
import {DesignerDropzoneSADirective} from '../../../directives';

const DRAG_OVER_DELAY = 500;

/**
 * Component displaying components tree item
 */
@Component(
{
    selector: 'components-tree-item',
    exportAs: 'componentsTreeItem',
    templateUrl: 'componentsTreeItem.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        MatButtonModule,
        DndModule,
        LayoutDndCoreModule,
        DesignerDropzoneSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTreeItemSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Node children
     */
    protected children: LayoutComponentMetadata[] = [];

    /**
     * Handles drag over events
     */
    protected dragOverSubscription?: Subscription|null;

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

    //######################### protected fields - template bindings #########################

    /**
     * Indicates whether layout component has children
     * @param node layout component to check
     * @returns 
     */
    protected get hasChildren(): boolean
    {
        return !!this.children && this.children.length > 0;
    }

    /**
     * Indication whether drag is disabled
     */
    protected get dragDisabled(): boolean
    {
        return !this.parentId || !this.data || this.manager.getComponent(this.data.id)?.dragDisabled === true;
    }

    /**
     * Child tree node components
     */
    @ViewChildren(ComponentsTreeItemSAComponent)
    protected childrenNodes!: QueryList<ComponentsTreeItemSAComponent>;

    //######################### public properties - inputs and outputs #########################

    /**
     * Instance component tree item
     */
    @Input()
    public data: LayoutComponentMetadata|undefined|null;

    /**
     * Tree item index
     */
    @Input()
    public index: number = 0;

    /**
     * Parent identifier
     */
    @Input()
    public parentId: string|undefined|null;

    /**
     * Indication whether node is open
     */
    @Input()
    public open: boolean = true;

    //######################### constructor #########################
    constructor(protected manager: LayoutEditorMetadataManager,
                protected changeDetector: ChangeDetectorRef,
                protected draggingSvc: DragActiveService,
                protected iteratorSvc: LayoutComponentsIteratorService,
    )
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.manager.layoutChange.subscribe(() => 
        {
            this.initChildren();
        }));
        
        this.initSubscriptions.add(toObservable(this.manager.selectedComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => 
            {
                this.changeDetector.detectChanges();
            }));
        
        this.initSubscriptions.add(toObservable(this.manager.highlightedComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => this.changeDetector.detectChanges()));
            
        this.initSubscriptions.add(toObservable(this.manager.draggedOverComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => this.handleDragOver()));

        //TODO: update display name if changes
        // this.initSubscriptions.add(this.manager.displayNameChange.subscribe(() => this.changeDetector.detectChanges()));

        this.initChildren();
    }
 
    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Toggle children visibility
     */
    public toggle(): void
    {
        this.open = !this.open;
    }

    /**
     * Expands tree node
     * @param nodeId node identifier to expand
     * @returns indication whether node or its children were expanded
     */
    public expand(nodeId?: string|undefined|null): boolean
    {
        if (!nodeId)
        {
            this.open = true;
            return true;
        }

        if (this.data?.id === nodeId)
        {
            return true;
        }

        if (this.hasChildren)
        {
            for (const child of this.childrenNodes?.toArray())
            {
                if (child.expand(nodeId))
                {
                    this.expand();
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    public addDescendant(dragData: LayoutComponentDragData): void
    {
        if (this.data)
        {
            this.manager.getComponent(this.data.id)?.addDescendant(dragData);
        }
    }
    
    /**
     * Expands node and all its children
     */
    public expandAll(): void
    {
        this.childrenNodes?.forEach((child: ComponentsTreeItemSAComponent) => child.expandAll());
        this.expand();
        this.changeDetector.detectChanges();
    }

    /**
     * Collapse tree node
     */
    public collapse(): void
    {
        this.open = false;
    }

    /**
     * Collapse node and all its children
     */
    public collapseAll(): void
    {
        this.childrenNodes?.forEach((child: ComponentsTreeItemSAComponent) => child.collapseAll());
        this.collapse();
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    @DebounceCall(10)
    @WithSync()
    protected async initChildren(): Promise<void>
    {
        this.children = [];

        if (this.data)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(this.data))
            {
                this.children.push(child.metadata);
            }
        }
        
        this.changeDetector.detectChanges();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Highlights component
     * @param event - Mouse event that occured
     * @param id - Id of component that is highlighted
     */
    protected highlight(event: MouseEvent, id?: string): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.manager.highlightComponent(id);
    }

    /**
     * Handle event when user is dragging over this components
     */
    protected handleDragOver(): void
    {
        if (this.manager.draggedOverComponent() != this.data?.id)
        {
            this.dragOverSubscription?.unsubscribe();
            this.dragOverSubscription = null;
            return;
        }

        if (!this.open)
        {
            this.dragOverSubscription = timer(DRAG_OVER_DELAY).subscribe(() =>
            {
                this.expand();
                this.changeDetector.detectChanges();
            });
        }
    }

    //######################### protected methods - host #########################

    /**
     * Cancels highlight of component
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected cancelHighlight(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.manager.cancelHighlightedComponent();
    }
}