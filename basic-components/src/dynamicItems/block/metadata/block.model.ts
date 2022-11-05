import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {BlockComponentOptions} from '../block.options';

/**
 * Block model for properties editor
 */
export class BlockModel implements BlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(value: BlockComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}