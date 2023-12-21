import {mapValuesToThis} from '@jscrpt/common';

import {DataTableComponentOptions} from '../dataTable.options';

/**
 * Data table model for properties editor
 */
export class DataTableModel implements DataTableComponentOptions
{
    //######################### public properties #########################

    
    //######################### constructor #########################
    constructor(value: DataTableComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}