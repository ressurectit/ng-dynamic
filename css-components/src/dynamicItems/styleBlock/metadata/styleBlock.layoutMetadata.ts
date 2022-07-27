import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {codePropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {CssLanguageModel} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

import {StyleBlockComponentOptions} from '../styleBlock.options';
import {StyleBlockModel} from './styleBlock.model';

/**
 * Style block layout metadata
 */
export class StyleBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<StyleBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<StyleBlockComponentOptions> =
    {
        name: 'Style',
        description: 'Style block - allows styling of content',
        group: 'Layout',
        optionsMetadata:
        {
            propertiesMetadata: 
            [
                {
                    modelType: StyleBlockModel,
                    propertiesControls: 
                    [
                        codePropertiesControlFor<StyleBlockModel>('style', CssLanguageModel),
                    ],
                },
            ]
        },
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, StyleBlockComponentOptions, number]> = (metadata, options) =>
    {
        options.content = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [StyleBlockComponentOptions|undefined|null]> = options => !options?.content;

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [StyleBlockComponentOptions|undefined|null]> = options => options?.content ? [options?.content] : [];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, StyleBlockComponentOptions]> = (_, options) =>
    {
        options.content = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}