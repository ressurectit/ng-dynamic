import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo, genericPropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {DialogMetadataSelectorComponentOptions} from '../dialogMetadataSelector.options';
import {DialogMetadataSelectorModel} from './dialogMetadataSelector.model';

/**
 * Dialog metadata selector layout metadata
 */
export class DialogMetadataSelectorLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<DialogMetadataSelectorComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<DialogMetadataSelectorComponentOptions> =
    {
        name: 'Dialog metadata selector',
        description: 'Dialog metadata selector grid plugin for metadata selection',
        group: 'Grid',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: DialogMetadataSelectorModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<DialogMetadataSelectorModel>(['storageName', 'showButtonVisible']),
                    ],
                },
            ]
        },
        defaultOptions:
        {
            showButtonVisible: true,
        }
    };

    /**
     * @inheritdoc
     */
    public customDragType?: Func0<{tree: string, layout: string}> = () =>
    {
        return {
            layout: 'METADATA_SELECTOR',
            tree: 'TREE_METADATA_SELECTOR',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}