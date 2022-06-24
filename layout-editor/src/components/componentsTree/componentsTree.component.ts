import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataManager, LayoutEditorMetadataManagerComponent} from '../../services';
import {ComponentTreeNodeTemplateSADirective} from '../../directives';

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
        MatTreeModule,
        MatButtonModule,
        ComponentTreeNodeTemplateSADirective,
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

    //######################### protected properties - template bindings #########################

    /**
     * Component tree data source
     */
    protected treeDataSource: MatTreeNestedDataSource<LayoutEditorMetadataManagerComponent> = new MatTreeNestedDataSource();

    /**
     * Component tree control
     */
    protected treeControl: NestedTreeControl<LayoutEditorMetadataManagerComponent> = new NestedTreeControl(component => component.children);

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
            this._setTreeDataSource(this._manager.root);
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._manager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._manager.idChange.subscribe(() => this._changeDetector.detectChanges()));

        this._setTreeDataSource(this._manager.root);
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
     * Indicates whether layout component has children
     * @param _ index
     * @param node layout component to check
     * @returns 
     */
    protected hasChild(_: number, node: LayoutEditorMetadataManagerComponent): boolean
    {
        return !!node.children && node.children.length > 0;
    }

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

    //######################### private methods #########################

    /**
     * Set component tree data source
     * @param root 
     */
    private _setTreeDataSource(root: LayoutEditorMetadataManagerComponent | null | undefined)
    {
        //TODO better solution to update data source
        this.treeDataSource.data = [];
        this.treeDataSource.data = root ? [root] : [];
    }
}