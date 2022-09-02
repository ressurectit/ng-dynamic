import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {ForBlockComponentOptions} from '../forBlock.options';

/**
 * For block model for properties editor
 */
export class ForBlockModel implements ForBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public template: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(value: ForBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}