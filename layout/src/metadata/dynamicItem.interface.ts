import {Type} from '@angular/core';

/**
 * Definition of dynamic item type
 */
export interface DynamicItemType<TType extends DynamicItem = any>
{
    //######################### properties #########################

    /**
     * Type used for instantiation of dynamic item
     */
    type: Type<TType>;
}

/**
 * Definition of dynamic item
 */
export interface DynamicItem
{
    //######################### methods #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}