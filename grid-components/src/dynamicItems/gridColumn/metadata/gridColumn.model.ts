import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnHeaderComponentOptions} from '../../gridColumnHeader';
import {GridColumnContentComponentOptions} from '../../gridColumnContent';

/**
 * Grid column model for properties editor
 */
export class GridColumnModel implements GridColumnComponentOptions
{
    //######################### public properties #########################

    /**
     * Contains content for grid column header
     */
    public header!: LayoutComponentMetadata<GridColumnHeaderComponentOptions>;

    /**
     * Contains content for grid column content
     */
    public content!: LayoutComponentMetadata<GridColumnContentComponentOptions>;
    
    //######################### constructor #########################
    constructor(value: GridColumnComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}