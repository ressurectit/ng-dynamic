import {ComponentStylingModel, DefaultKnownPropertyTypes, ForFormModel, LayoutPropertyDescription, LayoutPropertyMetadata, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {MetadataClassMixin} from '@anglr/dynamic';
import {mapValuesToThis} from '@jscrpt/common';

import {TextBlockComponentOptions} from '../textBlock.options';

/**
 * Text block model for properties editor
 */
@MetadataClassMixin(ComponentStylingModel, [LayoutPropertyMetadata])
export class TextBlockModel implements ForFormModel<TextBlockComponentOptions>
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
    constructor(value: TextBlockComponentOptions)
    {
        mapValuesToThis.bind(this)(value);
    }
}