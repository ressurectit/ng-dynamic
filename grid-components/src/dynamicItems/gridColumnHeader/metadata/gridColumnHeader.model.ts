import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridColumnHeaderComponentOptions} from '../gridColumnHeader.options';
/**
 * Grid column header model for properties editor
 */
export class GridColumnHeaderModel implements GridColumnHeaderComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: GridColumnHeaderComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}