import {ComponentStylingModel, DefaultKnownPropertyTypes, FORM_MODEL_CONTROLS_METADATA_PROPERTY, LayoutPropertyDescription, LayoutPropertyMetadata, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {MetadataClassMixin} from '@anglr/dynamic';
import {mapValuesToThis} from '@jscrpt/common';

import {TextBlockComponentOptions} from '../textBlock.options';

/**
 * Text block model for properties editor
 */
@MetadataClassMixin(ComponentStylingModel, [LayoutPropertyMetadata, FORM_MODEL_CONTROLS_METADATA_PROPERTY])
export class TextBlockModel implements TextBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text to be displayed in text block')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    text: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: TextBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}