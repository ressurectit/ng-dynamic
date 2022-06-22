import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, SkipSelf, Optional, Inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {Logger, LOGGER, PositionModule} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {CopyDesignerStylesSADirective, DesignerMinHeightSADirective} from '../../directives';
import {LayoutEditorMetadataExtractor, LayoutMetadataManager} from '../../services';
import {LayoutComponentDragData} from '../../interfaces';

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
        DesignerMinHeightSADirective,
        CopyDesignerStylesSADirective,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Indication whether were metadata read or not
     */
    protected _metadataRead: boolean = false;

    /**
     * Indication whether item can be dropped here
     */
    protected _canDrop: boolean = false;

    /**
     * Removes metadata of descendant
     */
    protected _removeDescendantMetadata: Action<[string, LayoutDesignerComponentOptions]>|undefined;

    /**
     * Adds metadata of descendant
     */
    protected _addDescendantMetadata: Action<[LayoutComponentMetadata, LayoutDesignerComponentOptions, number]>|undefined;

    /**
     * Tests whether metadata can be dropped into this component metadata
     */
    protected _canDropMetadata: Func<boolean, [LayoutDesignerComponentOptions]>|undefined;

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is overlay visible
     */
    protected overlayVisible: boolean = false;

    /**
     * Indication whether is component selected
     */
    protected get selected(): boolean
    {
        return this._layoutMetadataManager.selectedComponent === this._options?.typeMetadata.id;
    }

    /**
     * Gets predicate that returns indication whether item can be dropped into this list
     */
    protected canDrop: Func<boolean> = () => 
    {
        return this._canDrop;
    };

    /**
     * Metadata for rendered type
     */
    protected renderedType: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected _getter: DynamicItemLoader,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,
                protected _layoutMetadataManager: LayoutMetadataManager,
                @Inject(LOGGER) @Optional() logger?: Logger,
                @SkipSelf() @Optional() protected _parent?: LayoutDesignerSAComponent,)
    {
        super(changeDetector, element, logger);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._options)
        {
            this._layoutMetadataManager.unregisterLayoutDesignerComponent(this._options.typeMetadata.id);
        }
    }

    //######################### public methods #########################

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    protected removeDescendant(id: string): void
    {
        if(!this._options)
        {
            return;
        }

        this._removeDescendantMetadata?.(id, this._options.typeMetadata.options);
        this.renderedType = {...this._options.typeMetadata};
    }

    //######################### protected methods - host #########################

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    protected addDescendant(dragData: CdkDragDrop<LayoutComponentDragData, LayoutComponentDragData, LayoutComponentDragData>): void
    {
        if(!this._options)
        {
            return;
        }

        //already added to tree, removing old reference
        if(dragData.item.data.parentId)
        {
            this._layoutMetadataManager.getComponent(dragData.item.data.parentId)?.removeDescendant(dragData.item.data.metadata.id);
        }

        this._addDescendantMetadata?.(dragData.item.data.metadata, this._options.typeMetadata.options, dragData.currentIndex);
        this.renderedType = {...this._options.typeMetadata};
    }

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected showOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Showing overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this._parent?.hideOverlay(event);
        this.overlayVisible = true;
    }

    /**
     * Hides designer overlay
     * @param event - Mouse event that occured
     */
    protected hideOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Hiding overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this.overlayVisible = false;
    }

    protected selectComponent(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        if(this._options)
        {
            this._layoutMetadataManager.selectComponent(this._options.typeMetadata.id);
        }
    }

    //######################### protected methods #########################

    /**
     * @inheritdoc
     */
    protected override async _optionsSet(): Promise<void>
    {
        this.renderedType = this._options?.typeMetadata;

        if(!this._options)
        {
            return;
        }
        
        this._layoutMetadataManager.registerLayoutDesignerComponent(this, this._options.typeMetadata.id);
        await this._readMetadata();
        this._canDrop = this._canDropMetadata?.(this._options.typeMetadata.options) ?? false;

        this._changeDetector.detectChanges();
    }

    /**
     * Reads metadata stored in object
     */
    protected async _readMetadata(): Promise<void>
    {
        if(!this._options)
        {
            this._metadataRead = false;

            return;
        }

        if(this._metadataRead)
        {
            return;
        }

        const metadata = await this._metadataExtractor.extractMetadata(this._options.typeMetadata);
        this._canDropMetadata = await metadata?.canDropMetadata;
        this._removeDescendantMetadata = await metadata?.removeDescendant;
        this._addDescendantMetadata = await metadata?.addDescendant;

        this._metadataRead = true;
    }
}