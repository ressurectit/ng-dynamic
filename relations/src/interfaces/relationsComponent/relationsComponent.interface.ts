import {Injector} from '@angular/core';
import {DynamicItem, DynamicOnChanges} from '@anglr/dynamic';

import {RelationsOnDestroy} from '../relationsEvents';

/**
 * Description of relations component type
 */
export interface RelationsComponentType<TType extends RelationsComponent = RelationsComponent>
{
    new(injector: Injector): TType;
}

/**
 * Description of relations component
 */
export interface RelationsComponent<TOptions = any> extends DynamicItem, RelationsOnDestroy, DynamicOnChanges
{
    //######################### properties #########################

    /**
     * Options used in this relations component
     */
    relationsOptions: TOptions|undefined|null;
}
