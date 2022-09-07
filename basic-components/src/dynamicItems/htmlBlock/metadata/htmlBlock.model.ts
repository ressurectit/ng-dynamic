import {mapValuesToThis} from '@jscrpt/common';

import {HtmlBlockComponentOptions} from '../htmlBlock.options';

//TODO: check all models for "public" 

/**
 * Html block model for properties editor
 */
export class HtmlBlockModel implements HtmlBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * Html content to be displayed inside block
     */
    public content: string|undefined|null = null;

    //######################### constructor #########################
    constructor(value: HtmlBlockComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}