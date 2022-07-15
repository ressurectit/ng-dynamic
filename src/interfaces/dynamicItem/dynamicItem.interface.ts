import {Type} from '@angular/core';

import {DynamicItemExtension} from '../dynamicItemExtension';

/**
 * Definition of dynamic item data
 */
export interface DynamicItemDefData<TData = any>
{
    //######################### properties #########################

    /**
     * Data stored in dynamic item definition
     */
    data: TData;
}

/**
 * Definition of dynamic item extensions
 */
export interface DynamicItemExtensions<TExtension extends DynamicItemExtension = any>
{
    /**
     * Array of extension types for dynamic item
     */
    extensions?: Type<TExtension>[]|null;

    /**
     * Array of child extension types for dynamic item
     */
    childExtensions?: Type<TExtension>[]|null;
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