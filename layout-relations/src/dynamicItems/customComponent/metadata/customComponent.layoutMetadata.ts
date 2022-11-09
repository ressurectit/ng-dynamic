import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';

import {CustomComponentComponentOptions} from '../customComponent.options';
import {ContentOptionsPropertiesControlSAComponent} from '../misc';
import {CustomComponentModel} from './customComponent.model';

/**
 * Custom component layout metadata
 */
export class CustomComponentLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<CustomComponentComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo<CustomComponentComponentOptions> =
    {
        group: 'Components',
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
                {
                    modelType: CustomComponentModel,
                    propertiesControls: 
                    [
                        ContentOptionsPropertiesControlSAComponent,
                    ],
                },
            ]
        },
        defaultOptions:
        {
        }
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}