import {DebugData, DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {nameof} from '@jscrpt/common';

import {GridColumnsRelationsOptions} from './gridColumns.options';

/**
 * Grid columns relations for table row
 */
@DebugData(
{
    outputs: 
    [
        nameof<GridColumnsRelations>('row'),
    ],
})
export class GridColumnsRelations<TRow = unknown> implements RelationsComponent<GridColumnsRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: GridColumnsRelationsOptions|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Instance of row data in table
     */
    @DynamicOutput()
    public row: TRow|null = null;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}
