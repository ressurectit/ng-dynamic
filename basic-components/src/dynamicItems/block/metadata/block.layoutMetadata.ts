import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {BlockComponentOptions} from '../block.options';

/**
 * Block layout metadata
 */
export class BlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<BlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<BlockComponentOptions> =
    {
        name: 'Block',
        description: 'Block element, wraps content, allows custom styling',
        group: 'Layout',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls:
                    [
                        ComponentStylingPropertiesControlComponent,
                    ],
                },
            ]
        },
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, BlockComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [BlockComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, BlockComponentOptions]> = (_, options) =>
    {
        options.content = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}