import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Func} from '@jscrpt/common';

import {MaterialTabGroupComponentOptions} from '../tabGroup.options';
import {MaterialTabGroupModel} from './tabGroup.model';
import {MaterialTabGroupPropertiesControlSAComponent} from '../misc/components';


/**
 * Material expansion panel layout metadata
 */
export class MaterialTabGroupLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialTabGroupComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Tabs',
        description: 'Material tabs',
        group: 'Material',
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
                    modelType: MaterialTabGroupModel,
                    propertiesControls: 
                    [
                        MaterialTabGroupPropertiesControlSAComponent,
                    ],
                },
            ]
        }
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [MaterialTabGroupComponentOptions|undefined|null]> = () => false;

    /**
     * @inheritdoc
     */
    public getChildrenContainer?: Func<Element|null, [Element]> = element => element.querySelector('.mat-expansion-panel-body');

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}