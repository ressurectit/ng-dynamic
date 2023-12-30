import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {ShowMetadataSelectorButtonComponentOptions} from '../showMetadataSelectorButton.options';

/**
 * Show selector metadata button layout metadata
 */
export class ShowMetadataSelectorButtonLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<ShowMetadataSelectorButtonComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<ShowMetadataSelectorButtonComponentOptions> =
    {
        name: 'Show metadata selector button',
        description: 'Button displaying metadata selection',
        group: 'Grid',
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}