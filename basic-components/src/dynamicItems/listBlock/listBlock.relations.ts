import {Directive} from '@angular/core';
import {DynamicOutput, RelationsComponent} from '@anglr/dynamic/relations';

import {ListBlockRelationsOptions} from './listBlock.options';

/**
 * List block scoped relations component
 */
@Directive()
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
    @DynamicOutput({skipInit: true})
    public datum: TDatum|null = null;

    /**
     * Index of assigned datum to this item in list
     */
    @DynamicOutput({skipInit: true})
    public index: number = 0;

    /**
     * Indication whether is this first item in list
     */
    @DynamicOutput({skipInit: true})
    public first: boolean = false;

    /**
     * Indication whether is this last item in list
     */
    @DynamicOutput({skipInit: true})
    public last: boolean = false;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}
