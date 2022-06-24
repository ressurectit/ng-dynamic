import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, SkipSelf, Optional, Inject, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, CdkDropList, DragDropModule, DropListOrientation} from '@angular/cdk/drag-drop';
import {Logger, LOGGER, PositionModule} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Func, isPresent} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {ConnectDropListsSADirective, CopyDesignerStylesSADirective, DesignerMinDimensionSADirective} from '../../directives';
import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {LayoutComponentDragData, LayoutEditorMetadataDescriptor} from '../../interfaces';
import {LayoutEditorDragPreviewSAComponent} from '../layoutEditorDragPreview/layoutEditorDragPreview.component';
import {LayoutEditorDragPlaceholderSAComponent} from '../layoutEditorDragPlaceholder/layoutEditorDragPlaceholder.component';
import {LayoutDesignerOverlayForSAComponent} from '../layoutDesignerOverlayFor/layoutDesignerOverlayFor.component';

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Indication whether item can be dropped here
     */
    protected _canDropValue: boolean = false;

    /**
     * Layout editor metadata
     */
    protected _editorMetadata: LayoutEditorMetadataDescriptor<LayoutDesignerComponentOptions>|null = null;

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is component selected
     */
    protected get selected(): boolean
    {
        return this._layoutEditorMetadataManager.selectedComponent === this._options?.typeMetadata.id;
    }

    /**
     * Indication whether is component highlighted
     */
    protected get highlighted(): boolean
    {
        return this._layoutEditorMetadataManager.highlightedComponent === this._options?.typeMetadata.id;
    }

    /**
     * Gets predicate that returns indication whether item can be dropped into this list
     */
    protected _canDrop: Func<boolean> = () => this._canDropValue;

    /**
     * Metadata for rendered type
     */
    protected _renderedType: LayoutComponentMetadata|undefined|null;

    /**
     * Orientation of drop list
     */
    protected _orientation: DropListOrientation = 'vertical';

    //######################### public properties - children #########################

    /**
     * Instance of CdkDrop list that is present in componet
     */
    @ViewChild(CdkDropList, {static: true})
    public designerDropList!: CdkDropList;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected _getter: DynamicItemLoader,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,
                protected _layoutEditorMetadataManager: LayoutEditorMetadataManager,
                @Inject(LOGGER) @Optional() logger?: Logger,
                @SkipSelf() @Optional() protected _parent?: LayoutDesignerSAComponent,)
    {
        super(changeDetector, element, logger);
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override async initialize(options: LayoutDesignerComponentOptions|undefined|null): Promise<void>
    {
        if(!options)
        {
            return;
        }

        this._options = options;

        //TODO: optimize
        this._initSubscriptions.add(this._layoutEditorMetadataManager.selectedChange.subscribe(() => this._changeDetector.detectChanges()));
        this._initSubscriptions.add(this._layoutEditorMetadataManager.highlightedChange.subscribe(() => this._changeDetector.detectChanges()));

        this._editorMetadata = await this._metadataExtractor.extractMetadata(options.typeMetadata);
        this._canDropValue = this._editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;
        this._layoutEditorMetadataManager.registerLayoutDesignerComponent(this, options.typeMetadata.id, this._parent?._options?.typeMetadata.id);
        
        super.initialize(options);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._logger?.debug('LayoutDesignerSAComponent: Destroying component {@data}', {id: this._options?.typeMetadata.id});

        this._initSubscriptions.unsubscribe();

        if(this._options)
        {
            this._layoutEditorMetadataManager.unregisterLayoutDesignerComponent(this._options.typeMetadata.id);
        }
    }

    //######################### protected methods #########################

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    protected _removeDescendant(id: string): void
    {
        if(!this._options)
        {
            return;
        }

        this._logger?.debug('LayoutDesignerSAComponent: Removing descendant {@data}', {id: this._options.typeMetadata.id, child: id});

        this._editorMetadata?.removeDescendant?.(id, this._options.typeMetadata.options);
        this._canDropValue = this._editorMetadata?.canDropMetadata?.(this._options.typeMetadata.options) ?? false;
        this._renderedType = {...this._options.typeMetadata};
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    protected _addDescendant(dragData: CdkDragDrop<LayoutComponentDragData, LayoutComponentDragData, LayoutComponentDragData>): void
    {
        if(!this._options)
        {
            return;
        }

        const parentId = dragData.item.data.parentId;
        this._logger?.debug('LayoutDesignerSAComponent: Adding descendant {@data}', {id: dragData.item.data.metadata.id, parent: this._options.typeMetadata.id});

        //already added to tree, removing old reference
        if(parentId)
        {
            this._layoutEditorMetadataManager.getComponent(parentId)?._removeDescendant(dragData.item.data.metadata.id);
        }

        this._editorMetadata?.addDescendant?.(dragData.item.data.metadata, this._options.typeMetadata.options, dragData.currentIndex);
        this._canDropValue = this._editorMetadata?.canDropMetadata?.(this._options.typeMetadata.options) ?? false;

        this._renderedType = {...this._options.typeMetadata};
    }

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected _showOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Showing overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this._layoutEditorMetadataManager.highlightComponent(this._options?.typeMetadata.id);
    }

    /**
     * Hides designer overlay
     * @param event - Mouse event that occured
     */
    protected _hideOverlay(event: Event): void
    {
        if(isPresent(this._parent))
        {
            return;
        }

        this._logger?.verbose('LayoutDesignerComponent: Hiding overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this._layoutEditorMetadataManager.cancelHighlightedComponent();
    }

    /**
     * Marks component as selected
     * @param event - Event that occured
     */
    protected _selectComponent(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        if(this._options)
        {
            this._layoutEditorMetadataManager.selectComponent(this._options.typeMetadata.id);
        }
    }

    /**
     * Unselects selected component
     * @param event - Event that occured
     */
    protected _unselectComponent(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this._layoutEditorMetadataManager.unselectComponent();
    }

    /**
     * Removes itself from tree
     */
    protected _remove(): void
    {
        if(!this._parent || !this._options)
        {
            return;
        }

        this._parent._removeDescendant(this._options.typeMetadata.id);
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _optionsSet(): void
    {
        if(!this._options)
        {
            return;
        }

        this._renderedType = {...this._options.typeMetadata};
        
        this._orientation = this._editorMetadata?.isHorizontalDrop?.(this._options.typeMetadata.options) ? 'horizontal' : 'vertical';
    }
}