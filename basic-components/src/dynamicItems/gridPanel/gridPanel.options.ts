import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {GridPanelAreaComponentOptions} from '../gridPanelArea';
import {RowsColumnsOptions} from '../../interfaces';

/**
 * Options for grid panel component
 */
export interface GridPanelComponentOptions extends RowsColumnsOptions
{
    //######################### properties #########################

    /**
     * Definition of grid areas content
     */
    areas: LayoutComponentMetadata<GridPanelAreaComponentOptions>[];
}