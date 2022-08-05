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
    protected _injector?: Injector;

    /**
     * Element that could be extended
     */
    protected _element?: ElementRef<HTMLElement>;

    /**
     * Options that stores extension and component data
     */
    protected _options?: TOptions;

    /**
     * Instance of dynamic item that is being extended
     */
    protected _instance?: TInstance;

    /**
     * Indication whether was extension initialized
     */
    protected _initialized: boolean = false;

    //######################### constructor #########################
    constructor(protected _metadata: DynamicItemMetadata)
    {
    }

    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public async initialize(injector: Injector, element: ElementRef<HTMLElement>, instance: TInstance): Promise<void>
    {
        this._initialized = true;

        this._injector = injector;
        this._element = element;
        this._instance = instance;

        await this._onInit();
    }

    /**
     * @inheritdoc
     */
    public async optionsChange(options: TOptions): Promise<void>
    {
        this._options = options;

        if(!this._initialized)
        {
            return;
        }

        await this._onOptionsChange();
    }

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        this._onDestroy();
    }

    //######################### protected methods #########################

    /**
     * Called on initialization of component
     */
    protected _onInit(): PromiseOr<void>
    {
    }

    /**
     * Called on change of options of component
     */
    protected _onOptionsChange(): PromiseOr<void>
    {
    }

    /**
     * Called on destruction of component
     */
    protected _onDestroy(): void
    {
    }
}