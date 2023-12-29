import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
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
     * @inheritdoc
     */
    public header!: LayoutComponentMetadata<GridColumnHeaderComponentOptions>;

    /**
     * @inheritdoc
     */
    public content!: LayoutComponentMetadata<GridColumnContentComponentOptions>;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Width')
    @LayoutPropertyDescription('Width of column')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public width: string = '1fr';
    
    //######################### constructor #########################
    constructor(value: GridColumnComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}