import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataManager, LayoutEditorMetadataManagerComponent} from '../../services';
import {ComponentTreeNodeTemplateSADirective, ConnectDropListsSADirective} from '../../directives';
import {ComponentsTreeItemSAComponent} from './item';

/**
 * Component displaying components tree
 */
@Component(
{
    selector: 'components-tree',
    templateUrl: 'componentsTree.component.html',
    styleUrls: ['componentsTree.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        MatButtonModule,
        ComponentTreeNodeTemplateSADirective,
        DragDropModule,
        ConnectDropListsSADirective,
        ComponentsTreeItemSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTreeSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    //######################### protected fields - template bindings #########################

    /**
     * Instance of root component in tree
     */
    protected root: LayoutEditorMetadataManagerComponent|undefined|null;

    /**
     * Root component tree item
     */
    @ViewChild(ComponentsTreeItemSAComponent)
    protected rootTreeItem: ComponentsTreeItemSAComponent|undefined|null;

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
            this.root = this._manager.root;
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => 
        {
            this.rootTreeItem?.expand(this._manager.selectedComponent);
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._manager.displayNameChange.subscribe(() => this._changeDetector.detectChanges()));

        this.root = this._manager.root;
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Indicates whether layout component has children
     * @param node layout component to check
     * @returns 
     */
    protected hasChild(node: LayoutEditorMetadataManagerComponent): boolean
    {
        return !!node.children && node.children.length > 0;
    }
}