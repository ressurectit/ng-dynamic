import {ChangeDetectorRef, Directive, ElementRef, Inject, Injector, OnDestroy, Optional, SimpleChanges} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtension} from '@anglr/dynamic';
import {nameof, PromiseOr, resolvePromiseOr} from '@jscrpt/common';

import {LayoutComponent} from '../../interfaces';

/**
 * Base component for layout component
 */
@Directive()
export abstract class LayoutComponentBase<TOptions> implements LayoutComponent<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Array of extensions that are registered for component
     */
    protected _extensions: DynamicItemExtension<TOptions>[] = [];

    /**
     * Indication whether initialization was already done
     */
    protected _initialized: boolean = false;

    /**
     * Indication whether was component destroyed
     */
    protected destroyed: boolean = false;

    //######################### protected properties #########################

    /**
     * Gets element that is used within extension
     */
    protected get element(): ElementRef<HTMLElement>
    {
        return this._element;
    }

    /**
     * Gets options that are used within extension
     */
    protected get extensionsOptions(): any|undefined|null
    {
        return this.options;
    }

    //######################### public properties - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public options: TOptions|undefined|null;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,
                protected _injector: Injector,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.destroyed)
        {
            return;
        }

        this.destroyed = true;

        for(const ext of this._extensions)
        {
            ext.destroy();
        }

        this._onDestroy();
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public async ngOnInit(): Promise<void>
    {
        if(this._initialized)
        {
            return;
        }

        this._initialized = true;
        const extensionsOptions = this.extensionsOptions;
        
        await resolvePromiseOr(this._onInit());
        await resolvePromiseOr(this._onOptionsSet());

        if(extensionsOptions)
        {
            for(const extension of this._extensions)
            {
                await resolvePromiseOr(extension.initialize(this._injector, this.element, this));
            }
        }
    }

    /**
     * @inheritdoc
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        //options has changed
        if(nameof<LayoutComponentBase<TOptions>>('options') in changes)
        {
            await resolvePromiseOr(this._onOptionsSet());

            const extensionsOptions = this.extensionsOptions;

            //set options in extensions
            if(extensionsOptions)
            {
                for(const extension of this._extensions)
                {
                    await resolvePromiseOr(extension.optionsChange(extensionsOptions));
                }
            }

            if(!this._initialized)
            {
                return;
            }

            await resolvePromiseOr(this._onOptionsChange());
        }
    }

    /**
     * @inheritdoc
     */
    public registerExtensions(extensions: DynamicItemExtension[]): void
    {
        this._extensions = extensions;
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Called on initialzation of component, options are already set
     */
    protected _onInit(): PromiseOr<void>
    {
    }

    /**
     * Called on change of options, after initialization
     */
    protected _onOptionsChange(): PromiseOr<void>
    {
    }

    /**
     * Called everytime options are set, after initialization and later
     */
    protected _onOptionsSet(): PromiseOr<void>
    {
    }

    /**
     * Called when component is being destroyed
     */
    protected _onDestroy(): void
    {
    }
}