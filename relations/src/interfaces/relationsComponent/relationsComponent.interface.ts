import {OnChanges, OnDestroy} from '@angular/core';
import {DynamicItem} from '@anglr/dynamic';

/**
 * Description of relations component
 */
export interface RelationsComponent<TOptions = any> extends DynamicItem, Partial<OnDestroy>, OnChanges
{
    //######################### properties #########################

    /**
     * Options used in this relations component
     */
    relationsOptions: TOptions|undefined|null;

    /**
     * Allows dynamic obtaining and assigning of properties
     */
    [property: string]: unknown;
}
