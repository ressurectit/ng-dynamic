import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {ListBlockComponentOptions} from '../listBlock.options';

/**
 * List block layout metadata
 */
export class ListBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<ListBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<ListBlockComponentOptions> =
    {
        name: 'List',
        description: 'List block - displays template in array',
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
            ],
        },
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, ListBlockComponentOptions, number]> = (metadata, options) =>
    {
        options.template = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [ListBlockComponentOptions|undefined|null]> = options => !options?.template;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, ListBlockComponentOptions]> = (_, options) =>
    {
        options.template = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}