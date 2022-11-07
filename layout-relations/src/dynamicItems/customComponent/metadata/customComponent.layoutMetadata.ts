import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Func1} from '@jscrpt/common';

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

    /**
     * @inheritdoc
     */
    public getDescendants: Func1<LayoutComponentMetadata[], CustomComponentComponentOptions|undefined|null> = options => 
    {
        if(!options?.placeholderContainers)
        {
            return [];
        }

        const result: LayoutComponentMetadata[] = [];

        for(const key in options.placeholderContainers)
        {
            if(options.placeholderContainers[key])
            {
                result.push(options.placeholderContainers[key]);
            }
        }

        return result;
    };

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}