import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridPanelColumn, GridPanelComponentOptions, GridPanelRow} from '../gridPanel.options';
import {GridPanelAreaComponentOptions} from '../../gridPanelArea';

/**
 * Grid panel model for properties editor
 */
export class GridPanelModel implements GridPanelComponentOptions
{
    //######################### public properties #########################

    /**
     * Definition of rows for this grid
     */
    public rows: GridPanelRow[] = [];

    /**
     * Definition of columns for this grid
     */
    public columns: GridPanelColumn[] = [];

    /**
     * Definition of grid areas content
     */
    public areas: LayoutComponentMetadata<GridPanelAreaComponentOptions>[] = [];

    //######################### constructor #########################
    constructor(value: GridPanelComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}