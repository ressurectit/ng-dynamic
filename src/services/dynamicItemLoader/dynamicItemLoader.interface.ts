import {Type} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {DynamicItemExtension, DynamicItemSource, DynamicModule} from '../../interfaces';

/**
 * Dynamic item loader provider, used for locating dynamic item and obtaining it from it
 */
export interface DynamicItemLoaderProvider
{
    //######################### methods #########################

    /**
     * Tries to get dynamic item from source, if it fails returns null
     * @param source - Description of dynamic item source, used for obtaining dynamic item
     */
    tryToGet(source: DynamicItemSource): PromiseOr<DynamicModule|null>|null;
}

/**
 * Dynamic mocule extensions returned by extractor
 */
export interface DynamicModuleExtensions
{
    /**
     * Extensions applied directly to self
     */
    extensions?: Type<DynamicItemExtension>[]|null;

    /**
     * Extensions applied to children
     */
    childExtensions?: Type<DynamicItemExtension>[]|null;
}

/**
 * Extractor used for extracting dynamic item extensions from dynamic module
 */
export interface DynamicItemExtensionsExtractor
{
    //######################### methods #########################

    /**
     * Tries to extract dynamic item extensions from dynamic module
     * @param module - Module containing dynamic item extensions
     */
    tryToExtract(module: DynamicModule): DynamicModuleExtensions|null;
}