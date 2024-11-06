import {Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, Input, OnInit, OnDestroy, ViewChildren, QueryList, Injector, inject, Signal, computed, InputSignal, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DebounceCall, WithSync} from '@jscrpt/common';
import {DndModule} from '@ng-dnd/core';
import {Subscription, skip, timer} from 'rxjs';

import {DragActiveService, LayoutComponentsIteratorService, LayoutEditorMetadataManager} from '../../../services';
import {LayoutComponentDragData} from '../../../interfaces';
import {DndCoreTreeItemDirective} from '../../../directives';

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
        DndModule,
        CommonModule,
        MatButtonModule,
        DndCoreTreeItemDirective,
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

    //######################### protected properties - template bindings #########################

    /**
     * Indicates whether layout component has children
     * @param node layout component to check
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
        const data = this.data();

        return !this.parentId || !data || this.manager.getComponent(data.id)?.dragDisabled === true;
    }

    /**
     * Child tree node components
     */
    @ViewChildren(ComponentsTreeItemSAComponent)
    protected childrenNodes!: QueryList<ComponentsTreeItemSAComponent>;

    /**
     * Display name to be displayed
     */
    protected displayName: Signal<string>;

    //######################### public properties - inputs and outputs #########################

    /**
     * Instance of component tree item
     */
    public data: InputSignal<LayoutComponentMetadata|undefined|null> = input();

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
                protected iteratorSvc: LayoutComponentsIteratorService,)
    {
        this.displayName = computed(() =>
        {
            const data = this.data();

            if(!data)
            {
                return '';
            }

            const component = manager.getComponent(data.id);

            if(!component)
            {
                return '';
            }

            return (component.displayName() || component.metadataSafe.id) ?? '';
        });
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.manager.layoutChange.subscribe(() => this.initChildren()));
        
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

        if (this.data()?.id === nodeId)
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
        const data = this.data();

        if (data)
        {
            this.manager.getComponent(data.id)?.addDescendant(dragData);
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

    /**
     * Initialize children of component tree item
     */
    @DebounceCall(10)
    @WithSync()
    protected async initChildren(): Promise<void>
    {
        this.children = [];
        const data = this.data();

        if (data)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(data))
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
        if (this.manager.draggedOverComponent() != this.data()?.id)
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