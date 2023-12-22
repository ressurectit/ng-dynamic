import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridColumnContentComponentOptions} from '../gridColumnContent.options';
/**
 * Grid column content model for properties editor
 */
export class GridColumnContentModel implements GridColumnContentComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: GridColumnContentComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}