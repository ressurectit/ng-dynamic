import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialExpansionPanelComponentOptions} from '../expansionPanel.options';

/**
 * Material expansion panel model for properties editor
 */
export class MaterialExpansionPanelModel implements MaterialExpansionPanelComponentOptions
{
    //######################### public properties #########################
 
    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Expanded')
    @LayoutPropertyDescription('State of panel - visible or invisible')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public expanded: boolean|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Title')
    @LayoutPropertyDescription('Text to be displayed as panel title')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public title: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Description')
    @LayoutPropertyDescription('Text to be displayed as ddescription title')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public description: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    public children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: MaterialExpansionPanelComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}