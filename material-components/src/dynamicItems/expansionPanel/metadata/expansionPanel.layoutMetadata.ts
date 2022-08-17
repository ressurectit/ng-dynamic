import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {MaterialExpansionPanelComponentOptions} from '../expansionPanel.options';
import {MaterialExpansionPanelModel} from './expansionPanel.model';

/**
 * Material expansion panel layout metadata
 */
export class MaterialExpansionPanelLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<MaterialExpansionPanelComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Expansion panel',
        description: 'Material expansion panel',
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
                    modelType: MaterialExpansionPanelModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor<MaterialExpansionPanelModel>(['title', 'description', 'expanded'])
                    ],
                },
            ]
        },
        defaultOptions:
        {
            expanded: true,
            title: 'Panel title'   
        }
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, MaterialExpansionPanelComponentOptions, number]> = (metadata, options, index) =>
    {
        options.children ??= [];
        options.children.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [MaterialExpansionPanelComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public getChildrenContainer?: Func<Element|null, [Element]> = element => element.querySelector('.mat-expansion-panel-body');

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [MaterialExpansionPanelComponentOptions|undefined|null]> = options => options?.children ?? [];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, MaterialExpansionPanelComponentOptions]> = (id, options) =>
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