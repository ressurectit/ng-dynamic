import {mapValuesToThis} from '@jscrpt/common';

import {RichTextBlockComponentOptions} from '../richTextBlock.options';

/**
 * Rich text block model for properties editor
 */
export class RichTextBlockModel implements RichTextBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: string|undefined|null = '';
    
    //######################### constructor #########################
    constructor(value: RichTextBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}