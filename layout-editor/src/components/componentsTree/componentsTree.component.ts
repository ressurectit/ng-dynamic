import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {Subscription} from 'rxjs';

import {DragActiveService, LayoutEditorMetadataManager} from '../../services';
import {ComponentsTreeItemSAComponent} from './item';
import {DndBusService} from '../../modules';

/**
 * Component displaying components tree
 */
@Component(
{
    selector: 'components-tree',
    templateUrl: 'componentsTree.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        MatButtonModule,
        ComponentsTreeItemSAComponent,
        FirstUppercaseLocalizeSAPipe,
    ],
    providers:
    [
        DragActiveService,
        DndBusService,
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
    protected root: LayoutComponentMetadata|undefined|null;

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
            this.root = this._manager.getMetadata();
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => 
        {
            this.rootTreeItem?.expand(this._manager.selectedComponent);
            this._changeDetector.detectChanges();
        }));
        
        this._initSubscriptions.add(this._manager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._manager.displayNameChange.subscribe(() => this._changeDetector.detectChanges()));

        this.root = this._manager.getMetadata();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }
}