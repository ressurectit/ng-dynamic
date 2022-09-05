import {Injector, OnChanges, OnDestroy} from '@angular/core';
import {DynamicItem} from '@anglr/dynamic';

/**
 * Description of relations component type
 */
export interface RelationsComponentType<TType extends RelationsComponent = any>
{
    new(injector: Injector): TType;
}

/**
 * Description of relations component
 */
export interface RelationsComponent<TOptions = any> extends DynamicItem, Partial<OnDestroy>, Partial<OnChanges>
{
    //######################### properties #########################

    /**
     * Options used in this relations component
     */
    relationsOptions: TOptions|undefined|null;
}
