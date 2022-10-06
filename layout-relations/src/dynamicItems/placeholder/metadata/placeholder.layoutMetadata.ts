import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {PlaceholderComponentOptions} from '../placeholder.options';

/**
 * Placeholder layout metadata
 */
export class PlaceholderLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PlaceholderComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<PlaceholderComponentOptions> =
    {
        name: 'Placeholder',
        description: 'Placeholder component, which allows placing component inside custom component',
        group: 'Component',
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}