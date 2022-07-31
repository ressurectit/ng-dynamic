import {Component, ChangeDetectionStrategy, Input, FactoryProvider, inject, OnDestroy, OnChanges, SimpleChanges, Inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayFlexStyle} from '@anglr/common';
import {AppHotkeysService} from '@anglr/common/hotkeys';
import {EditorHotkeys, MetadataHistoryManager, MetadataStorage, PackageManagerModule} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {ComponentsPaletteSAComponent} from '../componentsPalette/componentsPalette.component';
import {ComponentsTreeSAComponent} from '../componentsTree/componentsTree.component';
import {PropertiesEditorSAComponent} from '../propertiesEditor/propertiesEditor.component';
import {LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '../../misc/providers';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';

/**
 * Component that represents layout editor with palette, tree and properties
 */
@Component(
{
    selector: 'layout-editor',
    templateUrl: 'layoutEditor.component.html',
    // styleUrls: ['layoutEditor.component.css'],
    styles: [HostDisplayFlexStyle],
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        <FactoryProvider>
        {
            provide: EditorHotkeys,
            useFactory: (hotkeys: AppHotkeysService, storage: MetadataStorage) => new EditorHotkeys(hotkeys, inject(LAYOUT_HISTORY_MANAGER), storage),
            deps: [AppHotkeysService, MetadataStorage],
        },
    ],
    standalone: true,
    imports:
    [
        ComponentsTreeSAComponent,
        ComponentsPaletteSAComponent,
        PropertiesEditorSAComponent,
        LayoutComponentRendererSADirective,
        PackageManagerModule,
        MatTabsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorSAComponent implements OnDestroy, OnChanges, OnInit
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### public properties - inputs #########################

    /**
     * Metadata that are used for rendering
     */
    @Input()
    public metadata: LayoutComponentMetadata|undefined|null = null;

    //######################### constructor #########################
    constructor(protected hotkeys: EditorHotkeys,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
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
        if(nameof<LayoutEditorSAComponent>('metadata') in changes)
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
}