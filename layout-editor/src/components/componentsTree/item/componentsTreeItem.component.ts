import {Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, Input, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Func} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {ComponentTreeNodeTemplateSADirective, ConnectDropListsSADirective} from '../../../directives';
import {LayoutEditorMetadataManager, LayoutEditorMetadataManagerComponent} from '../../../services';

/**
 * Component displaying components tree item
 */
@Component(
{
    selector: 'components-tree-item',
    exportAs: 'componentsTreeItem',
    templateUrl: 'componentsTreeItem.component.html',
    styleUrls: ['componentsTreeItem.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        MatButtonModule,
        ComponentTreeNodeTemplateSADirective,
        DragDropModule,
        ConnectDropListsSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTreeItemSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    //######################### protected fields - template bindings #########################

    /**
     * Indicates whether layout component has children
     * @param node layout component to check
     * @returns 
     */
    protected get hasChildren(): boolean
    {
        return !!this.data?.children && this.data?.children.length > 0;
    }

    /**
     * Child tree node components
     */
    @ViewChildren(ComponentsTreeItemSAComponent)
    protected _childrenNodes!: QueryList<ComponentsTreeItemSAComponent>;

    //######################### public properties - inputs and outputs #########################

    /**
     * Instance component tree item
     */
    @Input()
    public data: LayoutEditorMetadataManagerComponent|undefined|null;

    /**
     * Indication whether node is open
     */
    @Input()
    public open: boolean = true;

    //######################### constructor #########################
    constructor(protected _manager: LayoutEditorMetadataManager,
                protected _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this._manager.layoutChange.subscribe(() =>
        {
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => 
        {
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._manager.displayNameChange.subscribe(() => this._changeDetector.detectChanges()));
    }
 
    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
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

        if (this.data?.component?.options?.typeMetadata?.id === nodeId)
        {
            return true;
        }

        if (this.hasChildren)
        {
            for (const child of this._childrenNodes?.toArray())
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
     * Expands node and all its children
     */
    public expandAll(): void
    {
        this._childrenNodes?.forEach(child => child.expandAll());
        this.expand();
        this._changeDetector.detectChanges();
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
        this._childrenNodes?.forEach(child => child.collapseAll());
        this.collapse();
        this._changeDetector.detectChanges();
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

        this._manager.highlightComponent(id);
    }

    /**
     * Indicataion whether drag data can be dropped into node
     * @returns 
     */
    protected _canDrop: Func<boolean> = () => this.data?.component?.canDrop() ?? false;

    //######################### protected methods - host #########################

    /**
     * Cancels highlight of component
     * @param event - Mouse event that occured
     */
    @HostListener('mouseleave', ['$event'])
    protected _cancelHighlight(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this._manager.cancelHighlightedComponent();
    }
}