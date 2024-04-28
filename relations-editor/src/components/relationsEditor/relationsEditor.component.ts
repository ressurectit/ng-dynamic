import {Component, ChangeDetectionStrategy, Input, OnDestroy, OnInit, Inject, ChangeDetectorRef, OnChanges, SimpleChanges, ViewChild, Optional} from '@angular/core';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FirstUppercaseLocalizeSAPipe, HostDisplayFlexStyle} from '@anglr/common';
import {DynamicItemSource, EditorHotkeys, MetadataHistoryManager, PackageManagerModule} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {NodesPaletteSAComponent} from '../nodesPalette/nodesPalette.component';
import {RelationsCanvasSAComponent} from '../relationsCanvas/relationsCanvas.component';
import {RelationsNodeDragData, RelationsNodeMetadata} from '../../interfaces';
import {RELATIONS_HISTORY_MANAGER} from '../../misc/tokens';

/**
 * Component that represents relations editor with palette and canvas
 */
@Component(
{
    selector: 'relations-editor',
    templateUrl: 'relationsEditor.component.html',
    styles: [HostDisplayFlexStyle],
    standalone: true,
    imports:
    [
        NodesPaletteSAComponent,
        RelationsCanvasSAComponent,
        DragDropModule,
        PackageManagerModule,
        ReactiveFormsModule,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsEditorSAComponent implements OnInit, OnChanges, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Search bar form control for components
     */
    protected searchBar: FormControl = new FormControl();

    //######################### protected properties - view children #########################

    /**
     * Relation canvas
     */
    @ViewChild(RelationsCanvasSAComponent)
    protected relationCanvas: RelationsCanvasSAComponent|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Metadata used for rendering relations in canvas
     */
    @Input()
    public metadata: RelationsNodeMetadata[] = [];

    /**
     * Array of packages that should be used, if specified, package manager is not displayed
     */
    @Input()
    public packages: string[]|undefined|null;

    /**
     * Array of dynamic items sources which should be whitelisted, if this is used, package which is whitelisted will override black list and only components from whitelist will be available
     */
    @Input()
    public whiteList: DynamicItemSource[]|undefined|null;

    /**
     * Array of dynamic items sources which should be blacklisted, components used in this list will not be available, only if overriden by whitelist
     */
    @Input()
    public blackList: DynamicItemSource[]|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager<RelationsNodeMetadata[]>,
                protected changeDetector: ChangeDetectorRef,
                @Optional() protected hotkeys?: EditorHotkeys,)
    {
        hotkeys?.init();
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.initSubscriptions.add(this.history.pop.subscribe(metadata =>
        {
            this.metadata = metadata;
            this.changeDetector.detectChanges();
        }));

        if(this.hotkeys)
        {
            this.initSubscriptions.add(this.hotkeys.undo.subscribe(() => this.history.undo()));
            this.initSubscriptions.add(this.hotkeys.redo.subscribe(() => this.history.redo()));
        }
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<RelationsEditorSAComponent>('metadata') in changes)
        {
            this.history.clean();
            
            if(this.metadata)
            {
                this.history.setInitialState(this.metadata);
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
        this.hotkeys?.destroy();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new node into canvas and metadata
     * @param event - Drop event that occured
     */
    protected addNode(event: CdkDragDrop<RelationsNodeDragData, RelationsNodeDragData, RelationsNodeDragData>): void
    {        
        if (event.item.data.metadata.nodeMetadata?.coordinates)
        {
            const coordinates = this.relationCanvas?.getPositionInCanvas(event.dropPoint);

            if(coordinates)
            {
                event.item.data.metadata.nodeMetadata.coordinates.x = coordinates.x;
                event.item.data.metadata.nodeMetadata.coordinates.y = coordinates.y;
            }
        }

        this.metadata =
        [
            ...this.metadata,
            event.item.data.metadata,
        ];

        this.history.getNewState();
    }
}