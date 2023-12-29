import {DebugData, DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';
import {nameof} from '@jscrpt/common';

import {ListBlockRelationsOptions} from './listBlock.options';

/**
 * List block scoped relations component
 */
@DebugData(
{
    outputs: 
    [
        nameof<ListBlockRelations>('datum'),
        nameof<ListBlockRelations>('index'),
        nameof<ListBlockRelations>('first'),
        nameof<ListBlockRelations>('last'),
    ],
})
export class ListBlockRelations<TDatum = any> implements RelationsComponent<ListBlockRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ListBlockRelationsOptions|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Instance of datum assigned to this item in list
     */
    @DynamicOutput()
    public datum: TDatum|null = null;

    /**
     * Index of assigned datum to this item in list
     */
    @DynamicOutput()
    public index: number = 0;

    /**
     * Indication whether is this first item in list
     */
    @DynamicOutput()
    public first: boolean = false;

    /**
     * Indication whether is this last item in list
     */
    @DynamicOutput()
    public last: boolean = false;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}
