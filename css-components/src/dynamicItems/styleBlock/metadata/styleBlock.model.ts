import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {StyleBlockComponentOptions} from '../styleBlock.options';

/**
 * Style block model for properties editor
 */
export class StyleBlockModel implements StyleBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;

    /**
     * @inheritdoc
     */
    public style: string|undefined|null = '';
    
    //######################### constructor #########################
    constructor(value: StyleBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}