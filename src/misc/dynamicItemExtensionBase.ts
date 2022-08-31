import {ElementRef, Injector} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {DynamicItem, DynamicItemExtension, DynamicItemMetadata} from '../interfaces';

/**
 * Dynamic item extension base class
 */
export abstract class DynamicItemExtensionBase<TOptions = unknown, TInstance extends DynamicItem = any> implements DynamicItemExtension<TOptions, TInstance>
{
    //######################### protected fields #########################

    /**
     * Injector from extended component
     */
    protected injector?: Injector;

    /**
     * Element that could be extended
     */
    protected element?: ElementRef<HTMLElement>;

    /**
     * Options that stores extension and component data
     */
    protected options?: TOptions;

    /**
     * Instance of dynamic item that is being extended
     */
    protected instance?: TInstance;

    /**
     * Indication whether was extension initialized
     */
    protected initialized: boolean = false;

    //######################### constructor #########################
    constructor(protected metadata: DynamicItemMetadata)
    {
    }

    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public async initialize(injector: Injector, element: ElementRef<HTMLElement>, instance: TInstance): Promise<void>
    {
        this.initialized = true;

        this.injector = injector;
        this.element = element;
        this.instance = instance;

        await this.onInit();
    }

    /**
     * @inheritdoc
     */
    public async optionsChange(options: TOptions): Promise<void>
    {
        this.options = options;

        if(!this.initialized)
        {
            return;
        }

        await this.onOptionsChange();
    }

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        this.onDestroy();
    }

    //######################### protected methods #########################

    /**
     * Called on initialization of component
     */
    protected onInit(): PromiseOr<void>
    {
    }

    /**
     * Called on change of options of component
     */
    protected onOptionsChange(): PromiseOr<void>
    {
    }

    /**
     * Called on destruction of component
     */
    protected onDestroy(): void
    {
    }
}