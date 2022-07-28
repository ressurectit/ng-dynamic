import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {StackPanelComponentOptions} from '../stackPanel.options';
import {StackPanelFlexExtensionOptions} from '../stackPanelExtensions.options';

/**
 * Stack panel model for properties editor
 */
export class StackPanelModel implements StackPanelComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Horizontal')
    @LayoutPropertyDescription('Indication whether display stacked elements horizontally')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public horizontal: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Wrap')
    @LayoutPropertyDescription('Indication whether wrap children if there is not enough space')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public wrap: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    public children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: StackPanelComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}

/**
 * Stack panel flex extension model for properties editor
 */
export class StackPanelFlexExtensionModel implements StackPanelFlexExtensionOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Flex')
    @LayoutPropertyDescription('Definition of flex behavior')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public flex: string|undefined|null = null;

    //######################### constructor #########################
    constructor(value: StackPanelFlexExtensionOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}