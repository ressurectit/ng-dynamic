import {Invalidatable} from '@jscrpt/common';

import {DynamicItemExtensionType} from '../dynamicItemExtension';

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
export interface DynamicItemExtensions
{
    /**
     * Array of extension types for dynamic item
     */
    extensions?: DynamicItemExtensionType[]|null;

    /**
     * Array of child extension types for dynamic item
     */
    childExtensions?: DynamicItemExtensionType[]|null;
}

//TODO: cleanup, do not use this its duplicate

/**
 * Definition of dynamic item editor data
 */
export interface DynamicItemEditorData
{
    /**
     * Display name of custom component
     */
    displayName?: string;

    /**
     * Description for custom component
     */
    description?: string;

    /**
     * Group of custom component
     */
    group?: string;
}

/**
 * Definition of dynamic item
 */
export interface DynamicItem extends Invalidatable
{
}