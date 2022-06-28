import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, DefaultKnownPropertyTypes, FORM_MODEL_CONTROLS_METADATA_PROPERTY, LayoutPropertyDescription, LayoutPropertyMetadata, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {MetadataClassMixin} from '@anglr/dynamic';
import {mapValuesToThis} from '@jscrpt/common';

import {StackPanelComponentOptions} from '../stackPanel.options';

/**
 * Stack panel model for properties editor
 */
@MetadataClassMixin(ComponentStylingModel, [LayoutPropertyMetadata, FORM_MODEL_CONTROLS_METADATA_PROPERTY])
export class StackPanelModel implements StackPanelComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Horizontal')
    @LayoutPropertyDescription('Indication whether display stacked elements horizontally')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    horizontal: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Wrap')
    @LayoutPropertyDescription('Indication whether wrap children if there is not enough space')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    wrap: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: StackPanelComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}