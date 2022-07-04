import {ElementRef, Injector} from '@angular/core';
import {DynamicItemExtension} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';

import {StackPanelFlexExtensionOptions} from '../stackPanelExtensions.options';

/**
 * Child extension that applies flex styling to child
 */
export class StackPanelFlexExtension implements DynamicItemExtension
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
     * Options that stores extension data
     */
    protected _options?: StackPanelFlexExtensionOptions;

    /**
     * Indication whether was extension initialized
     */
    protected _initialized: boolean = false;

    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public initialize(injector: Injector, element: ElementRef<HTMLElement>, options: StackPanelFlexExtensionOptions): void
    {
        this._initialized = true;

        this._injector = injector;
        this._element = element;
        this._options = options;

        this.optionsChange(this._options);
    }

    /**
     * @inheritdoc
     */
    public optionsChange(options: StackPanelFlexExtensionOptions): void
    {
        if(!this._initialized)
        {
            return;
        }

        if(isPresent(options.flex))
        {
            const style = this._element?.nativeElement.style;

            if(style && this._options)
            {
                style.flex = this._options.flex ?? '';
            }
        }
    }

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
    }
}