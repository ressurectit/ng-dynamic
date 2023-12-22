import {mapValuesToThis} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';

/**
 * Grid column model for properties editor
 */
export class GridColumnModel implements GridColumnComponentOptions
{
    //######################### public properties #########################

    
    //######################### constructor #########################
    constructor(value: GridColumnComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}