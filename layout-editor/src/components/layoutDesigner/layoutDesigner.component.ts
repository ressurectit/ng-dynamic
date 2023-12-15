import {Component, ChangeDetectionStrategy, ElementRef, SkipSelf, Optional, Inject, OnDestroy, ViewChild} from '@angular/core';
import {PositionToSADirective} from '@anglr/common';
import {LayoutComponent, LayoutComponentMetadata, LayoutComponentRenderer2SADirective} from '@anglr/dynamic/layout';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {MetadataHistoryManager, SCOPE_ID} from '@anglr/dynamic';
import {extend, isPresent} from '@jscrpt/common';
import {DndModule} from '@ng-dnd/core';
import {Subscription} from 'rxjs';
import {isEqual} from 'lodash-es';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {BodyRenderSADirective, CopyDesignerStylesSADirective, DesignerDropzoneSADirective, DesignerMinDimensionSADirective} from '../../directives';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {LayoutDesignerOverlayForSAComponent} from '../layoutDesignerOverlayFor/layoutDesignerOverlayFor.component';
import {LayoutEditorMetadataDescriptor} from '../../decorators';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';
import {DndCoreDesignerDirective, LayoutDndCoreModule} from '../../modules';
import {LayoutComponentDragData} from '../../interfaces';
import {CombineRenderersCallbacksSAPipe} from '../../pipes';

/**
 * Component used as designer component wrapper for layout component
 */
@Component(
{
    selector: 'layout-designer-component',
    templateUrl: 'layoutDesigner.component.html',
    standalone: true,
    imports:
    [
        LayoutDndCoreModule,
        DndModule,
        LayoutDesignerOverlayForSAComponent,
        LayoutComponentRenderer2SADirective,
        DesignerMinDimensionSADirective,
        CopyDesignerStylesSADirective,
        DesignerDropzoneSADirective,
        PositionToSADirective,
        BodyRenderSADirective,
        CombineRenderersCallbacksSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Last type metadata value from onOptionSet
     */
    protected typeMetadata: LayoutComponentMetadata<LayoutDesignerComponentOptions>|null|undefined;

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is component selected
     */
    protected get selected(): boolean
    {
        return this.layoutEditorMetadataManager.selectedComponent() === this.id;
    }

    /**
     * Indication whether is component highlighted
     */
    protected get highlighted(): boolean
    {
        return this.layoutEditorMetadataManager.highlightedComponent() === this.id;
    }

    /**
     * Metadata for rendered type
     */
    protected renderedType: LayoutComponentMetadata|undefined|null;

    //######################### protected properties - overrides #########################

    /**
     * @inheritdoc
     */
    protected override get element(): ElementRef<HTMLElement>
    {
        return this.designerElement;
    }

    /**
     * @inheritdoc
     */
    protected override get extensionsOptions(): any|undefined|null
    {
        return this.options?.typeMetadata.options;
    }

    //######################### protected properties - children #########################

    /**
     * Instance of designer div element
     */
    @ViewChild('layoutDesigner', {static: true})
    protected designerElement!: ElementRef<HTMLElement>;

    //######################### public properties - children #########################

    /**
     * Instance of designer dnd core directive
     */
    @ViewChild('dndCoreDesigner', {static: true})
    public dndCoreDesigner!: DndCoreDesignerDirective;

    //######################### public properties #########################

    /**
     * Indication whether drag is disabled for component
     */
    public get dragDisabled(): boolean
    {
        return !this.parent || !!this.editorMetadata?.metaInfo?.dragDisabled;
    }

    /**
     * Indication whether item can be dropped here
     */
    public canDrop: boolean = false;

    /**
     * Indication whether drop list is horizontally oriented
     */
    public horizontal: boolean = false;

    /**
     * Component identifier
     */
    public get id(): string
    {
        if(!this.options?.typeMetadata?.id)
        {
            throw new Error('LayoutDesignerSAComponent: missing ID!');
        }

        return this.options.typeMetadata.id;
    }

    /**
     * Index of current layout designer in its parent
     */
    public index: number = 0;

    /**
     * Layout editor metadata
     */
    public editorMetadata: LayoutEditorMetadataDescriptor|null = null;

    //######################### constructor #########################
    constructor(protected metadataExtractor: LayoutEditorMetadataExtractor,
                protected layoutEditorMetadataManager: LayoutEditorMetadataManager,
                protected iteratorSvc: LayoutComponentsIteratorService,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
                @Optional() @Inject(SCOPE_ID) protected scopeId: string|undefined|null,
                @SkipSelf() @Optional() protected parent?: LayoutDesignerSAComponent,)
    {
        super();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public override ngOnDestroy(): void
    {
        this.logger?.debug('LayoutDesignerSAComponent: Destroying component {{@data}}', {data: {id: this.options?.typeMetadata.id}});

        this.initSubscriptions.unsubscribe();

        super.ngOnDestroy();

        if(this.options)
        {
            this.layoutEditorMetadataManager.unregisterLayoutDesignerComponent(this.options.typeMetadata.id);
        }
    }

    //######################### public methods #########################

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    public addDescendant(dragData: LayoutComponentDragData): void
    {
        if(!this.options)
        {
            return;
        }

        const parentId = dragData.parentId;
        this.logger?.debug('LayoutDesignerSAComponent: Adding descendant {{@data}}', {data: {id: dragData.metadata?.id, parent: this.options.typeMetadata.id}});

        if(!dragData.metadata)
        {
            this.logger?.warn('LayoutDesignerSAComponent: Missing metadata while adding descendant');

            return;
        }

        //already added to tree, removing old reference
        if(parentId)
        {
            this.history.disable();
            this.layoutEditorMetadataManager.getComponent(parentId)?.removeDescendant(dragData.metadata?.id);
            this.history.enable();
        }

        this.editorMetadata?.addDescendant?.(dragData?.metadata, this.options.typeMetadata.options, dragData.index ?? 0);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;

        this.renderedType = {...this.options.typeMetadata};
        this.changeDetector.markForCheck();
        this.history.getNewState();
    }

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    public removeDescendant(id: string): void
    {
        if(!this.options)
        {
            return;
        }

        this.logger?.debug('LayoutDesignerSAComponent: Removing descendant {{@data}}', {data: {id: this.options.typeMetadata.id, child: id}});

        this.editorMetadata?.removeDescendant?.(id, this.options.typeMetadata.options);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;
        this.renderedType = {...this.options.typeMetadata};
        this.changeDetector.markForCheck();
        this.history.getNewState();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected showOverlay(event: Event): void
    {
        this.logger?.verbose('LayoutDesignerComponent: Showing overlay for {{@type}}', {type: {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id}});

        event.preventDefault();
        event.stopPropagation();

        this.layoutEditorMetadataManager.highlightComponent(this.options?.typeMetadata.id);
    }

    /**
     * Hides designer overlay
     * @param event - Mouse event that occured
     */
    protected hideOverlay(event: Event): void
    {
        if(isPresent(this.parent))
        {
            return;
        }

        this.logger?.verbose('LayoutDesignerComponent: Hiding overlay for {{@type}}', {type: {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id}});

        event.preventDefault();
        event.stopPropagation();

        this.layoutEditorMetadataManager.cancelHighlightedComponent();
    }

    /**
     * Marks component as selected
     * @param event - Event that occured
     */
    protected selectComponent(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        if(this.options)
        {
            this.layoutEditorMetadataManager.selectComponent(this.id);
        }
    }

    /**
     * Unselects selected component
     * @param event - Event that occured
     */
    protected unselectComponent(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.layoutEditorMetadataManager.unselectComponent();
    }

    /**
     * Removes itself from tree
     */
    protected remove(): void
    {
        if(!this.parent || !this.options)
        {
            return;
        }

        this.parent.removeDescendant(this.options.typeMetadata.id);
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onInit(): Promise<void>
    {
        await super.onInit();

        if(!this.options)
        {
            return;
        }

        this.options.typeMetadata.scope = this.scopeId;

        if(this.parent?.options)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(this.parent.options?.typeMetadata))
            {
                if(this.options.typeMetadata.id === child.metadata.id)
                {
                    this.index = child.index;

                    break;
                }
            }
        }

        this.editorMetadata = await this.metadataExtractor.extractMetadata(this.options.typeMetadata);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;

        this.layoutEditorMetadataManager.registerLayoutDesignerComponent(this, this.options.typeMetadata.id, this.parent?.options?.typeMetadata.id);
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if(!this.options ||
           isEqual(this.typeMetadata, this.options.typeMetadata))
        {
            return;
        }

        this.renderedType = {...this.options.typeMetadata};
        this.typeMetadata = extend(true, {}, this.options.typeMetadata);
        this.horizontal = this.editorMetadata?.isHorizontalDrop?.(this.options.typeMetadata.options) ?? false;
        this.changeDetector.detectChanges();
    }
}