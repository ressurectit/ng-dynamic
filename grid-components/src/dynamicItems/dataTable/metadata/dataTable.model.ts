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
     * @inheritdoc
     */
    public columns!: LayoutComponentMetadata;

    /**
     * @inheritdoc
     */
    public paging!: LayoutComponentMetadata;

    /**
     * @inheritdoc
     */
    public dataLoader!: LayoutComponentMetadata;

    /**
     * @inheritdoc
     */
    public metadataSelector!: LayoutComponentMetadata;
    
    //######################### constructor #########################
    constructor(value: DataTableComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}