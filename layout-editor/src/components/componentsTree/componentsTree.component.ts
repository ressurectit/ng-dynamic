import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, ViewChild, Injector, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {Subscription, skip} from 'rxjs';

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
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

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
    constructor(protected manager: LayoutEditorMetadataManager,
                protected changeDetector: ChangeDetectorRef,)
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
            this.root = this.manager.getMetadata();
            this.changeDetector.detectChanges();
        }));
        
        this.initSubscriptions.add(toObservable(this.manager.selectedComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => 
            {
                this.rootTreeItem?.expand(this.manager.selectedComponent());
                this.changeDetector.detectChanges();
            }));
        
        this.initSubscriptions.add(toObservable(this.manager.highlightedComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => this.changeDetector.detectChanges()));
        this.initSubscriptions.add(this.manager.displayNameChange.subscribe(() => this.changeDetector.detectChanges()));

        this.root = this.manager.getMetadata();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }
}