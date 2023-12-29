import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo, genericPropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {BasicPagingComponentOptions} from '../basicPaging.options';
import {BasicPagingModel} from './basicPaging.model';

/**
 * Basic paging layout metadata
 */
export class BasicPagingLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<BasicPagingComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<BasicPagingComponentOptions> =
    {
        name: 'Basic paging',
        description: 'Basic paging grid plugin for paging data',
        group: 'Grid',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: BasicPagingModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<BasicPagingModel>(['initialItemsPerPage']),
                    ],
                },
            ]
        },
        defaultOptions:
        {
            initialItemsPerPage: 15,
        }
    };

    /**
     * @inheritdoc
     */
    public customDragType?: Func0<{tree: string, layout: string}> = () =>
    {
        return {
            layout: 'PAGING',
            tree: 'TREE_PAGING',
        };
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}