import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo, genericPropertiesControlFor} from '@anglr/dynamic/layout-editor';
import {Func0} from '@jscrpt/common';

import {PreviousNextPagingComponentOptions} from '../previousNextPaging.options';
import {PreviousNextPagingModel} from './previousNextPaging.model';

/**
 * Previous next paging layout metadata
 */
export class PreviousNextPagingLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<PreviousNextPagingComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<PreviousNextPagingComponentOptions> =
    {
        name: 'Previous next paging',
        description: 'Previous next paging grid plugin for paging data',
        group: 'Grid',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: PreviousNextPagingModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<PreviousNextPagingModel>(['initialItemsPerPage']),
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