import {Component, ChangeDetectionStrategy, Input, FactoryProvider, inject, OnDestroy, OnInit, Inject, ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {HostDisplayFlexStyle} from '@anglr/common';
import {AppHotkeysService} from '@anglr/common/hotkeys';
import {EditorHotkeys, MetadataHistoryManager, MetadataStorage, PackageManagerModule} from '@anglr/dynamic';
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
    // styleUrls: ['relationsEditor.component.css'],
    styles: [HostDisplayFlexStyle],
    standalone: true,
    imports:
    [
        NodesPaletteSAComponent,
        RelationsCanvasSAComponent,
        DragDropModule,
        PackageManagerModule,
    ],
    providers:
    [
        <FactoryProvider>
        {
            provide: EditorHotkeys,
            useFactory: (hotkeys: AppHotkeysService, storage: MetadataStorage) => new EditorHotkeys(hotkeys, inject(RELATIONS_HISTORY_MANAGER), storage),
            deps: [AppHotkeysService, MetadataStorage],
        },
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

    //######################### public properties - inputs #########################

    /**
     * Metadata used for rendering relations in canvas
     */
    @Input()
    public metadata: RelationsNodeMetadata[] = [];

    //######################### constructor #########################
    constructor(protected hotkeys: EditorHotkeys,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager<RelationsNodeMetadata[]>,
                protected changeDetector: ChangeDetectorRef,)
    {
        hotkeys.init();
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
        this.hotkeys.destroy();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new node into canvas and metadata
     * @param event - Drop event that occured
     */
    protected addNode(event: CdkDragDrop<RelationsNodeDragData, RelationsNodeDragData, RelationsNodeDragData>): void
    {
        //TODO: apply transform of canvas

        const canvasRect = event.container.element.nativeElement.getBoundingClientRect();

        if(event.item.data.metadata.nodeMetadata?.coordinates)
        {
            event.item.data.metadata.nodeMetadata.coordinates.x = event.dropPoint.x - canvasRect.x;
            event.item.data.metadata.nodeMetadata.coordinates.y = event.dropPoint.y - canvasRect.y;
        }

        this.metadata =
        [
            ...this.metadata,
            event.item.data.metadata,
        ];

        this.history.getNewState();
    }
}