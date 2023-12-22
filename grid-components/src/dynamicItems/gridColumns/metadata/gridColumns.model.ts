import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridColumnsComponentOptions} from '../gridColumns.options';

/**
 * Grid columns model for properties editor
 */
export class GridColumnsModel implements GridColumnsComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public columns!: LayoutComponentMetadata[];
    
    //######################### constructor #########################
    constructor(value: GridColumnsComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}