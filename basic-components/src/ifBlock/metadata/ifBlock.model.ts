import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {IfBlockComponentOptions} from '../ifBlock.options';

/**
 * If block model for properties editor
 */
export class IfBlockModel implements IfBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    content: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: IfBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}