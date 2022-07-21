import {ElementRef, Injector} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

/**
 * Definition of dynamic item extension
 */
export interface DynamicItemExtension<TOptions = any>
{
    //######################### public methods #########################

    /**
     * Initialize dynamic item extension
     * @param injector - Injector from extended component
     * @param element - Element that is being extended
     * @param options - Options of extended component
     */
    initialize(injector: Injector, element: ElementRef<HTMLElement>, options: TOptions): PromiseOr<void>;

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