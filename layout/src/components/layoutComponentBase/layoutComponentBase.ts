import {ChangeDetectorRef, Directive, ElementRef, Inject, Injector, OnDestroy, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtension} from '@anglr/dynamic';
import {resolvePromiseOr} from '@jscrpt/common';

import {LayoutComponent} from '../../interfaces';

/**
 * Base component for layout component
 */
@Directive()
export abstract class LayoutComponentBase<TOptions> implements LayoutComponent<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Options used for rendering this component
     */
    protected _options: TOptions|undefined|null;

    /**
     * Array of extensions that are registered for component
     */
    protected _extensions: DynamicItemExtension<TOptions>[] = [];

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
        return this._options;
    }

    //######################### public properties - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public get options(): TOptions|undefined|null
    {
        return this._options;
    }
    public set options(value: TOptions|undefined|null)
    {
        this._options = value;

        this._optionsSet();

        const extensionsOptions = this.extensionsOptions;

        if(extensionsOptions)
        {
            for(const ext of this._extensions)
            {
                ext.optionsChange(extensionsOptions);
            }
        }
    }

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
        for(const ext of this._extensions)
        {
            ext.destroy();
        }
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public async initialize(options: TOptions|undefined|null): Promise<void>
    {
        if(!options)
        {
            return;
        }

        this.options = options;

        const extensionsOptions = this.extensionsOptions;

        if(extensionsOptions)
        {
            for(const ext of this._extensions)
            {
                await resolvePromiseOr(ext.initialize(this._injector, this.element, extensionsOptions));
            }
        }
    }

    /**
     * Registers extensions for component
     * @param extensions - Array of extensions that should be added to component
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
     * Method that is called when options are set, allows register custom code that is called when options are changing
     */
    protected _optionsSet(): void
    {
    }
}