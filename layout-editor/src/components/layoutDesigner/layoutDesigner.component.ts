import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, SkipSelf, Optional, Inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Logger, LOGGER, PositionModule} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

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

    //######################### protected methods - host #########################

    /**
     * Adds component to this component
     * @param metadata - Metadata of component that is added here
     * @param parentId - Id of previous component parent, where was item before, null if moved from palette
     */
    protected addComponent(dragData: LayoutComponentDragData): void
    {
        console.log(dragData);
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
        if(this._options)
        {
            this._layoutMetadataManager.registerLayoutDesignerComponent(this, this._options.typeMetadata.id);
        }

        // const x = await this._getter.loadItem(this._options!.typeMetadata);

        // const metadataType = x?.type as unknown as LayoutEditorMetadataType;

        // if(metadataType.layoutEditorMetadata)
        // {
        //     const getter = await metadataType.layoutEditorMetadata.descendantsGetter;

        //     console.log(getter!(this._options!.typeMetadata));
        // }
    }
}