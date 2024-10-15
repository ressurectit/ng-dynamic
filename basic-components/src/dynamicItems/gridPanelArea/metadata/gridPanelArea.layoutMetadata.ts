import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {GridPanelAreaComponentOptions} from '../gridPanelArea.options';
import {applyGridCoordinates} from '../gridPanelArea.utils';

/**
 * Grid panel area metadata
 */
export class GridPanelAreaLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<GridPanelAreaComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Grid area',
        dragDisabled: true,
    };

    /**
     * @inheritdoc
     */
    public addDescendant: Action<[LayoutComponentMetadata, GridPanelAreaComponentOptions, number]> = (metadata, options, _index) =>
    {
        options.component = metadata;
    };

    /**
     * @inheritdoc
     */
    public applyDesignerStyles: Action<[GridPanelAreaComponentOptions|null|undefined, CSSStyleDeclaration]> = applyGridCoordinates;

    /**
     * @inheritdoc
     */
    public canDropMetadata: Func<boolean, [GridPanelAreaComponentOptions|undefined|null]> = options => !options?.component;

    /**
     * @inheritdoc
     */
    public removeDescendant: Action<[string, GridPanelAreaComponentOptions]> = (id, options) =>
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