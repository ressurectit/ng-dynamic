import {Component, ChangeDetectionStrategy, ElementRef, SkipSelf, Optional, Inject, OnDestroy, ViewChild, SimpleChanges} from '@angular/core';
import {BodyRenderDirective, PositionToSADirective} from '@anglr/common';
import {LayoutComponent, LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {MetadataHistoryManager, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';
import {DndModule} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {DesignerDropzoneSADirective} from '../../directives';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorRenderer} from '../../services';
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
        LayoutComponentRendererSADirective,
        DesignerDropzoneSADirective,
        PositionToSADirective,
        BodyRenderDirective,
        CombineRenderersCallbacksSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Gets rendered component instance
     */
    protected get componentInstance(): LayoutComponent
    {
        const renderer = this.layoutRenderer.get(this.id);

        if(!renderer?.component)
        {
            throw new Error('LayoutDesignerSAComponent: unable to find renderer!');
        }

        return renderer.component.instance;
    }

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
    @ViewChild('dndCore', {static: true})
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
        return this.optionsSafe.typeMetadata.id;
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
                protected layoutRenderer: LayoutEditorRenderer,
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
        this.logger.debug('LayoutDesignerSAComponent: Destroying component {{@data}}', {data: {id: this.options?.typeMetadata.id}});

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
        const options = this.optionsSafe;
        let triggerLayoutChange = false;
        const parentId = dragData.parentId;
        this.logger.debug('LayoutDesignerSAComponent: Adding descendant {{@data}}', {data: {id: dragData.metadata?.id, parent: this.id}});

        if(!dragData.metadata)
        {
            this.logger.warn('LayoutDesignerSAComponent: Missing metadata while adding descendant');

            return;
        }

        //already added to tree, removing old reference
        if(parentId)
        {
            //only changing order in same parent
            if(parentId == this.id)
            {
                this.logger.verbose('LayoutDesignerSAComponent: Swapping child component {{@(4)data}}', {data: {id: this.id}});

                this.editorMetadata?.removeDescendant?.(dragData.metadata.id, options.typeMetadata.options);
                triggerLayoutChange = true;
            }
            else
            {
                this.history.disable();
                this.layoutEditorMetadataManager.getComponent(parentId)?.removeDescendant(dragData.metadata.id);
                this.history.enable();
            }
        }

        this.editorMetadata?.addDescendant?.(dragData?.metadata, options.typeMetadata.options, dragData.index ?? 0);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;

        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', options.typeMetadata.options, options.typeMetadata.options, false);
        this.componentInstance.dynamicOnChanges?.(changes);
        this.componentInstance.invalidateVisuals();

        if(triggerLayoutChange)
        {
            this.layoutEditorMetadataManager.updateLayout();
        }

        const layoutDesigners = this.layoutEditorMetadataManager.getChildren(this.id);
        
        //update indexes of children
        for(const designer of layoutDesigners)
        {
            // designer?.updateIndex();
            designer?.invalidateVisuals();
        }

        this.history.getNewState();
    }

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    public removeDescendant(id: string): void
    {
        const options = this.optionsSafe;

        this.logger.debug('LayoutDesignerSAComponent: Removing descendant {{@(4)data}}', {data: {id: this.id, child: id}});

        this.editorMetadata?.removeDescendant?.(id, options.typeMetadata.options);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;
        
        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', options.typeMetadata.options, options.typeMetadata.options, false);
        this.componentInstance.dynamicOnChanges?.(changes);
        this.componentInstance.invalidateVisuals();

        const layoutDesigners = this.layoutEditorMetadataManager.getChildren(this.id);
        
        //update indexes of children
        for(const designer of layoutDesigners)
        {
            // designer?.updateIndex();
            designer?.invalidateVisuals();
        }

        this.history.getNewState();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected showOverlay(event: Event): void
    {
        this.logger.verbose('LayoutDesignerComponent: Showing overlay for {{@type}}', {type: {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id}});

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

        this.logger.verbose('LayoutDesignerComponent: Hiding overlay for {{@type}}', {type: {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id}});

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
        if(!this.parent)
        {
            return;
        }

        this.parent.removeDescendant(this.id);
    }

    //######################### protected methods #########################

    /**
     * Updates its own index in parent
     */
    protected async updateIndex(): Promise<void>
    {
        const options = this.optionsSafe;

        //obtains index of itself in parent
        if(this.parent?.options)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(this.parent.options?.typeMetadata))
            {
                if(options.typeMetadata.id === child.metadata.id)
                {
                    this.index = child.index;

                    break;
                }
            }
        }
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onInit(): Promise<void>
    {
        await super.onInit();

        const options = this.optionsSafe;

        //TODO: SCOPE: use parent scope for settings this
        options.typeMetadata.scope = this.scopeId;

        await this.updateIndex();

        this.editorMetadata = await this.metadataExtractor.extractMetadata(options.typeMetadata);
        this.canDrop = this.editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;
        this.renderedType = options.typeMetadata;

        // this.layoutEditorMetadataManager.registerLayoutDesignerComponent(this, options.typeMetadata.id, this.parent?.options?.typeMetadata.id);
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        const options = this.optionsSafe;

        this.horizontal = this.editorMetadata?.isHorizontalDrop?.(options.typeMetadata.options) ?? false;
    }
}