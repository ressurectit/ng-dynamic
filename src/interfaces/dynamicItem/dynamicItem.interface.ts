import {Type} from '@angular/core';

import {DynamicItemExtension} from '../dynamicItemExtension';

/**
 * Definition of dynamic item definition
 */
export interface DynamicItemDef<TType extends DynamicItem = any, TExtension extends DynamicItemExtension = any>
{
    //######################### properties #########################

    /**
     * Type used for instantiation of dynamic item
     */
    type: Type<TType>;

    /**
     * Array of child extension types for dynamic item
     */
    childExtensions?: Type<TExtension>[]|null;

    /**
     * Array of extension types for dynamic item
     */
    extensions?: Type<TExtension>[]|null;
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