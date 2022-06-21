import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Action} from '@jscrpt/common';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';
import {applyGridCoordinates} from './gridPanelCell.utils';

/**
 * Grid panel layout metadata
 */
export class GridPanelCellLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>
{
    //######################### protected fields #########################

    /**
     * Applies designer styles that are required to be applied to drag n drop div
     */
    protected _applyDesignerStyles: Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]> = applyGridCoordinates;

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get applyDesignerStyles(): Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]>
    {
        return this._applyDesignerStyles;
    }
}