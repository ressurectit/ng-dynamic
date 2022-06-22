import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {GridPanelCellComponentOptions} from '../gridPanelCell.options';
import {applyGridCoordinates} from '../gridPanelCell.utils';

/**
 * Grid panel layout metadata
 */
export class GridPanelCellLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>
{
    //######################### protected fields #########################

    /**
     * @inheritdoc
     */
    protected _addDescendant: Action<[LayoutComponentMetadata, GridPanelCellComponentOptions, number]> = (metadata, options, _index) =>
    {
        options.component = metadata;
    };

    /**
     * @inheritdoc
     */
    protected _applyDesignerStyles: Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]> = applyGridCoordinates;

    /**
     * @inheritdoc
     */
    protected _canDropMetadata: Func<boolean, [GridPanelCellComponentOptions|undefined|null]> = options => !options?.component;

    /**
     * @inheritdoc
     */
    protected _removeDescendant: Action<[string, GridPanelCellComponentOptions]> = (id, options) =>
    {
        if(options.component?.id === id)
        {
            options.component = undefined;
        }
    }

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get addDescendant(): Action<[LayoutComponentMetadata, GridPanelCellComponentOptions, number]>
    {
        return this._addDescendant;
    }

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

    /**
     * @inheritdoc
     */
    public get removeDescendant(): Action<[string, GridPanelCellComponentOptions]>
    {
        return this._removeDescendant;
    }
}