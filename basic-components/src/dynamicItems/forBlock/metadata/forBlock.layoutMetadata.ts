import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action, Func} from '@jscrpt/common';

import {ForBlockComponentOptions} from '../forBlock.options';

/**
 * For block layout metadata
 */
export class ForBlockLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<ForBlockComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<ForBlockComponentOptions> =
    {
        name: 'For',
        description: 'For block - displays template in array',
        group: 'Layout',
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, ForBlockComponentOptions, number]> = (metadata, options) =>
    {
        options.template = metadata;
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [ForBlockComponentOptions|undefined|null]> = options => !options?.template;

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [ForBlockComponentOptions|undefined|null]> = options => options?.template ? [options?.template] : [];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, ForBlockComponentOptions]> = (_, options) =>
    {
        options.template = null;
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}