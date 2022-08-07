import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, SkipSelf, Optional, Inject, OnDestroy, Injector, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule, DropListOrientation} from '@angular/cdk/drag-drop';
import {Logger, LOGGER, PositionModule} from '@anglr/common';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {Func, isPresent} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {BodyRenderSADirective, ConnectDropListsSADirective, CopyDesignerStylesSADirective, DesignerDropzoneSADirective, DesignerMinDimensionSADirective} from '../../directives';
import {DragActiveService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {LayoutComponentDragData} from '../../interfaces';
import {LayoutEditorDragPreviewSAComponent} from '../layoutEditorDragPreview/layoutEditorDragPreview.component';
import {LayoutEditorDragPlaceholderSAComponent} from '../layoutEditorDragPlaceholder/layoutEditorDragPlaceholder.component';
import {LayoutDesignerOverlayForSAComponent} from '../layoutDesignerOverlayFor/layoutDesignerOverlayFor.component';
import {LayoutEditorMetadataDescriptor} from '../../decorators';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';

//TODO: when new is clicked only after event new item can be dropped into 
//TODO: display overlay outside of component so overflow has no effect on it

/**
 * Component used as designer component wrapper for layout component
 */
@Component(
{
    selector: 'layout-designer-component',
    templateUrl: 'layoutDesigner.component.html',
    styleUrls: ['layoutDesigner.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        PositionModule,
        DragDropModule,
        LayoutEditorDragPreviewSAComponent,
        LayoutEditorDragPlaceholderSAComponent,
        LayoutDesignerOverlayForSAComponent,
        DesignerMinDimensionSADirective,
        CopyDesignerStylesSADirective,
        ConnectDropListsSADirective,
        LayoutComponentRendererSADirective,
        DesignerDropzoneSADirective,
        BodyRenderSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>, OnDestroy
{
    //######################### public properties #########################

    /**
     * Component identifier
     */
    public get id(): string
    {
        return this.options?.typeMetadata?.id ?? '';
    }

    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Indication whether item can be dropped here
     */
    protected canDropValue: boolean = false;

    /**
     * Layout editor metadata
     */
    protected editorMetadata: LayoutEditorMetadataDescriptor<LayoutDesignerComponentOptions>|null = null;

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is component selected
     */
    protected get selected(): boolean
    {
        return this.layoutEditorMetadataManager.selectedComponent === this.options?.typeMetadata.id;
    }

    /**
     * Indication whether is component highlighted
     */
    protected get highlighted(): boolean
    {
        return this.layoutEditorMetadataManager.highlightedComponent === this.options?.typeMetadata.id;
    }

    /**
     * Metadata for rendered type
     */
    protected _renderedType: LayoutComponentMetadata|undefined|null;

    /**
     * Orientation of drop list
     */
    protected _orientation: DropListOrientation = 'vertical';

    //######################### protected properties - overrides #########################

    /**
     * @inheritdoc
     */
    protected override get element(): ElementRef<HTMLElement>
    {
        return this._designerElement;
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
    protected _designerElement!: ElementRef<HTMLElement>;

    //######################### public properties #########################

    /**
     * Indication whether drag is disabled for component
     */
    public get dragDisabled(): boolean
    {
        return !this.parent || !!this.editorMetadata?.metaInfo?.dragDisabled;
    }

    /**
     * Gets predicate that returns indication whether item can be dropped into this list
     */
    public canDrop: Func<boolean> = () => this.canDropValue;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                injector: Injector,
                protected draggingSvc: DragActiveService,
                protected metadataExtractor: LayoutEditorMetadataExtractor,
                protected layoutEditorMetadataManager: LayoutEditorMetadataManager,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
                @Inject(LOGGER) @Optional() logger?: Logger,
                @SkipSelf() @Optional() protected parent?: LayoutDesignerSAComponent,)
    {
        super(changeDetector, element, injector, logger);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public override ngOnDestroy(): void
    {
        this._logger?.debug('LayoutDesignerSAComponent: Destroying component {@data}', {id: this.options?.typeMetadata.id});

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
    public addDescendant(dragData: CdkDragDrop<LayoutComponentDragData, LayoutComponentDragData, LayoutComponentDragData>): void
    {
        if(!this.options)
        {
            return;
        }

        const parentId = dragData.item.data.parentId;
        this._logger?.debug('LayoutDesignerSAComponent: Adding descendant {@data}', {id: dragData.item.data.metadata.id, parent: this.options.typeMetadata.id});

        //already added to tree, removing old reference
        if(parentId)
        {
            this.history.disable();
            this.layoutEditorMetadataManager.getComponent(parentId)?.removeDescendant(dragData.item.data.metadata.id);
            this.history.enable();
        }

        this.editorMetadata?.addDescendant?.(dragData.item.data.metadata, this.options.typeMetadata.options, dragData.currentIndex);
        this.canDropValue = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;

        this._renderedType = {...this.options.typeMetadata};
        this._changeDetector.markForCheck();
        this.history.getNewState();
    }

    //######################### protected methods #########################

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    protected removeDescendant(id: string): void
    {
        if(!this.options)
        {
            return;
        }

        this._logger?.debug('LayoutDesignerSAComponent: Removing descendant {@data}', {id: this.options.typeMetadata.id, child: id});

        this.editorMetadata?.removeDescendant?.(id, this.options.typeMetadata.options);
        this.canDropValue = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;
        this._renderedType = {...this.options.typeMetadata};
        this._changeDetector.markForCheck();
        this.history.getNewState();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected showOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Showing overlay for {@type}', {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id});

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

        this._logger?.verbose('LayoutDesignerComponent: Hiding overlay for {@type}', {name: this.options?.typeMetadata.name, id: this.options?.typeMetadata.id});

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
            this.layoutEditorMetadataManager.selectComponent(this.options.typeMetadata.id);
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
    protected override async _onInit(): Promise<void>
    {
        await super._onInit();

        if(!this.options)
        {
            return;
        }

        //TODO: optimize
        this.initSubscriptions.add(this.layoutEditorMetadataManager.selectedChange.subscribe(() => this._changeDetector.detectChanges()));
        this.initSubscriptions.add(this.layoutEditorMetadataManager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));

        this.editorMetadata = await this.metadataExtractor.extractMetadata(this.options.typeMetadata);
        this.canDropValue = this.editorMetadata?.canDropMetadata?.(this.options.typeMetadata.options) ?? false;
        this.layoutEditorMetadataManager.registerLayoutDesignerComponent(this, this.options.typeMetadata.id, this.parent?.options?.typeMetadata.id);
    }

    /**
     * @inheritdoc
     */
    protected override _onOptionsSet(): void
    {
        if(!this.options)
        {
            return;
        }

        this._renderedType = {...this.options.typeMetadata};
        this._orientation = this.editorMetadata?.isHorizontalDrop?.(this.options.typeMetadata.options) ? 'horizontal' : 'vertical';
    }
}