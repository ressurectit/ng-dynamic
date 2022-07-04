import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {TextBlockComponentOptions} from '../textBlock.options';

/**
 * Text block model for properties editor
 */
export class TextBlockModel implements TextBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text to be displayed in text block')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public text: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: TextBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}