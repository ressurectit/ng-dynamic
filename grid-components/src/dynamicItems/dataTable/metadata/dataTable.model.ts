import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {DataTableComponentOptions} from '../dataTable.options';
/**
 * Data table model for properties editor
 */
export class DataTableModel implements DataTableComponentOptions
{
    //######################### public properties #########################

    /**
     * Holds columns definition
     */
    public columns!: LayoutComponentMetadata;

    /**
     * Holds paging type
     */
    public paging!: LayoutComponentMetadata;

    /**
     * Holds data loader type
     */
    public dataLoader!: LayoutComponentMetadata;
    
    //######################### constructor #########################
    constructor(value: DataTableComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}