import {ElementRef, Injector} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {DynamicItem} from '../dynamicItem/dynamicItem.interface';
import {DynamicItemMetadata} from '../dynamicItem/dynamicItemMetadata.interface';

/**
 * Type that represents dynamic item extension
 */
export interface DynamicItemExtensionType extends Function
{
    /**
     * Creates new instance of DynamicItemExtension using metadata of component that will be applied to
     */
    new (metadata: DynamicItemMetadata): DynamicItemExtension;
}

/**
 * Definition of dynamic item extension
 */
export interface DynamicItemExtension<TOptions = any, TInstance extends DynamicItem = any>
{
    //######################### public methods #########################

    /**
     * Initialize dynamic item extension
     * @param injector - Injector from extended component
     * @param element - Element that is being extended
     * @param instance - Instance of component being extended
     */
    initialize(injector: Injector, element: ElementRef<HTMLElement>, instance: TInstance): PromiseOr<void>;

    /**
     * Notifies dynamic item extension that options has changed
     * @param options - Options that has changed
     */
    optionsChange(options: TOptions): PromiseOr<void>;

    /**
     * Destroys dynamic item extensions
     */
    destroy(): void;
}