import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {GridPanelComponentOptions} from '../gridPanel.options';
import {GridPanelAreaComponentOptions} from '../../gridPanelArea';

/**
 * Grid panel model for properties editor
 */
export class GridPanelModel implements Pick<GridPanelComponentOptions, 'areas'>
{
    //######################### public properties #########################
    
    /**
     * @inheritdoc
     */
    public areas: LayoutComponentMetadata<GridPanelAreaComponentOptions>[] = [];

    //######################### constructor #########################
    constructor(value: GridPanelComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}