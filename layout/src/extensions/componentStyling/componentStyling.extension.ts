import {ElementRef, Injector} from '@angular/core';
import {DynamicItemExtension} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';

import {ComponentStylingOptions} from '../../interfaces';

/**
 * Child extension that applies common component styling to child
 */
export class ComponentStylingExtension implements DynamicItemExtension
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
    protected _options?: ComponentStylingOptions;

    /**
     * Indication whether was extension initialized
     */
    protected _initialized: boolean = false;

    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public initialize(injector: Injector, element: ElementRef<HTMLElement>, options: ComponentStylingOptions): void
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
    public optionsChange(options: ComponentStylingOptions): void
    {
        if(!this._initialized)
        {
            return;
        }

        const style = this._element?.nativeElement.style;

        if(isPresent(style))
        {
            if(options?.margin)
            {
                if(isPresent(options.margin.bottom))
                {
                    style.marginBottom = options.margin.bottom;
                }

                if(isPresent(options.margin.right))
                {
                    style.marginRight = options.margin.right;
                }

                if(isPresent(options.margin.top))
                {
                    style.marginTop = options.margin.top;
                }

                if(isPresent(options.margin.left))
                {
                    style.marginLeft = options.margin.left;
                }
            }

            if(options?.padding)
            {
                if(isPresent(options.padding.bottom))
                {
                    style.paddingBottom = options.padding.bottom;
                }

                if(isPresent(options.padding.right))
                {
                    style.paddingRight = options.padding.right;
                }

                if(isPresent(options.padding.top))
                {
                    style.paddingTop = options.padding.top;
                }

                if(isPresent(options.padding.left))
                {
                    style.paddingLeft = options.padding.left;
                }
            }

            if(options?.textStyling)
            {
                if(isPresent(options.textStyling.fontSize))
                {
                    style.fontSize = options.textStyling.fontSize;
                }

                if(isPresent(options.textStyling.fontWeight))
                {
                    style.fontWeight = options.textStyling.fontWeight.toString();
                }
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