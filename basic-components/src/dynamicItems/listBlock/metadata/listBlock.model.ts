import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {ListBlockComponentOptions} from '../listBlock.options';

/**
 * List block model for properties editor
 */
export class ListBlockModel implements ListBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public template: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(value: ListBlockComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}