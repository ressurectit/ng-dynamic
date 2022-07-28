import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {genericPropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {IfBlockComponentOptions} from '../ifBlock.options';
import {IfBlockModel} from './ifBlock.model';

/**
 * If block layout metadata
 */
export class IfBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<IfBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<IfBlockComponentOptions> =
    {
        name: 'If',
        description: 'If block - conditionally displays content',
        group: 'Layout',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: IfBlockModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<IfBlockModel>(['condition']),
                    ],
                },
            ]
        },
        defaultOptions:
        {
            condition: true,
        }
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, IfBlockComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [IfBlockComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [IfBlockComponentOptions|undefined|null]> = options => options?.content ? [options?.content] : [];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, IfBlockComponentOptions]> = (_, options) =>
    {
        options.content = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}