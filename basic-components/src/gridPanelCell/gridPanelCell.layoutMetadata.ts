import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';
import {applyGridCoordinates} from './gridPanelCell.utils';

/**
 * Grid panel layout metadata
 */
export class GridPanelCellLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected _applyDesignerStyles: Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]> = applyGridCoordinates;

    /**
     * @inheritdoc
     */
    protected _canDropMetadata: Func<boolean, [GridPanelCellComponentOptions|undefined|null]> = options => !options?.component;

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get applyDesignerStyles(): Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]>
    {
        return this._applyDesignerStyles;
    }

    /**
     * @inheritdoc
     */
    public get canDropMetadata(): Func<boolean, [GridPanelCellComponentOptions|undefined|null]>
    {
        return this._canDropMetadata;
    }
}