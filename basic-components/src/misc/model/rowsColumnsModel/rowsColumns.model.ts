import {mapValuesToThis} from '@jscrpt/common';

import {ColumnDefinition, RowDefinition, RowsColumnsOptions} from '../../../interfaces';

/**
 * Rows columns model for properties editor
 */
export class RowsColumnsModel implements RowsColumnsOptions
{
    //######################### public properties #########################

    /**
     * Definition of rows for this grid
     */
    public rows: RowDefinition[] = [];

    /**
     * Definition of columns for this grid
     */
    public columns: ColumnDefinition[] = [];

    //######################### constructor #########################
    constructor(value: RowsColumnsOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}