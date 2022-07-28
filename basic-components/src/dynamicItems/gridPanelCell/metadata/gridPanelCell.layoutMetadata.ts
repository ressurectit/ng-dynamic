import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {GridPanelCellComponentOptions} from '../gridPanelCell.options';
import {applyGridCoordinates} from '../gridPanelCell.utils';

/**
 * Grid panel layout metadata
 */
export class GridPanelCellLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelCellComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Grid cell',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant: Action<[LayoutComponentMetadata, GridPanelCellComponentOptions, number]> = (metadata, options, _index) =>
    {
        options.component = metadata;
    };

    /**
     * @inheritdoc
     */
    public applyDesignerStyles: Action<[GridPanelCellComponentOptions|null|undefined, CSSStyleDeclaration]> = applyGridCoordinates;

    /**
     * @inheritdoc
     */
    public canDropMetadata: Func<boolean, [GridPanelCellComponentOptions|undefined|null]> = options => !options?.component;

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [GridPanelCellComponentOptions|undefined|null]> = options => options?.component ? [options.component] : [];

    /**
     * @inheritdoc
     */
    public removeDescendant: Action<[string, GridPanelCellComponentOptions]> = (id, options) =>
    {
        if(options.component?.id === id)
        {
            options.component = undefined;
        }
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}