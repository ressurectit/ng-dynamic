import {DefaultKnownPropertyTypes, ForFormModel, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {TextBlockComponentOptions} from '../textBlock.options';

/**
 * Text block model for properties editor
 */
export class TextBlockModel implements ForFormModel<TextBlockComponentOptions>
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text to be displayed in text block')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    text: string|undefined|null;

    
    //######################### constructor #########################
    constructor(value: TextBlockComponentOptions)
    {
        mapValuesToThis.bind(this)(value);
    }
}