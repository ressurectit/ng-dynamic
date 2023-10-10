import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {MaterialTabComponentOptions} from '../tab.options';
import {MaterialTabModel} from './tab.model';


/**
 * Material expansion panel layout metadata
 */
export class MaterialTabLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialTabComponentOptions>
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
                    modelType: MaterialTabModel,
                    propertiesControls: 
                    [
                        // genericPropertiesControlFor<MaterialExpansionPanelModel>(['title', 'description', 'expanded'])
                    ],
                },
            ]
        }
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, MaterialTabComponentOptions, number]> = (metadata, options, index) =>
    {
        options.children ??= [];
        options.children.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [MaterialTabComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public getChildrenContainer?: Func<Element|null, [Element]> = element => element.querySelector('.mat-expansion-panel-body');

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, MaterialTabComponentOptions]> = (id, options) =>
    {
        options.children ??= [];
        const index = options.children.findIndex(itm => itm.id === id);
        options.children.splice(index, 1);
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}