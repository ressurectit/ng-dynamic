import {Component, ChangeDetectionStrategy, Input, OnDestroy, OnChanges, SimpleChanges, Inject, OnInit, ChangeDetectorRef, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {LayoutComponentMetadata, LayoutComponentRenderer2SADirective} from '@anglr/dynamic/layout';
import {CastPipesModule, CommonUtilsModule, FirstUppercaseLocalizeSAPipe, HostDisplayFlexStyle} from '@anglr/common';
import {EditorHotkeys, MetadataHistoryManager, PackageManagerModule, DynamicItemSource} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {ComponentsPaletteSAComponent} from '../componentsPalette/componentsPalette.component';
import {ComponentsTreeSAComponent} from '../componentsTree/componentsTree.component';
import {PropertiesEditorSAComponent} from '../propertiesEditor/propertiesEditor.component';
import {LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '../../misc/providers';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';
import {DndBusService, LayoutDndCoreModule} from '../../modules';
import {LayoutEditorDragPreviewSAComponent} from '../layoutEditorDragPreview/layoutEditorDragPreview.component';

/**
 * Component that represents layout editor with palette, tree and properties
 */
@Component(
{
    selector: 'layout-editor',
    templateUrl: 'layoutEditor.component.html',
    styles: [HostDisplayFlexStyle],
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        DndBusService,
    ],
    standalone: true,
    imports:
    [
        ComponentsTreeSAComponent,
        ComponentsPaletteSAComponent,
        PropertiesEditorSAComponent,
        LayoutDndCoreModule,
        LayoutEditorDragPreviewSAComponent,
        LayoutComponentRenderer2SADirective,
        PackageManagerModule,
        MatTabsModule,
        CommonModule,
        CommonUtilsModule,
        FirstUppercaseLocalizeSAPipe,
        CastPipesModule,
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
    constructor(@Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
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
        this.hotkeys?.destroy();
    }
}