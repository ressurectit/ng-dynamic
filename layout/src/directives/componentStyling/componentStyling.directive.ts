import {Directive, ElementRef, Input} from '@angular/core';
import {isPresent} from '@jscrpt/common';

import {ComponentStylingOptions} from './componentStyling.options';

/**
 * Directive that applies some styling to component
 */
@Directive(
{
    selector: '[componentStyling]',
    exportAs: 'componentStyling',
    standalone: true
})
export class ComponentStylingSADirective
{
    //######################### protected fields #########################

    /**
     * Instance of styling options
     */
    protected _options: ComponentStylingOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Gets or sets instance of styling options
     */
    @Input('componentStyling')
    public get options(): ComponentStylingOptions|undefined|null
    {
        return this._options;
    }
    public set options(value: ComponentStylingOptions|undefined|null)
    {
        this._options = value;

        this._applyStyles();
    }

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>)
    {
    }

    //######################### protected methods #########################

    /**
     * Applies styles to layout component
     */
    protected _applyStyles(): void
    {
        const style = this._element.nativeElement.style;

        if(this._options?.margin)
        {
            if(isPresent(this._options.margin.bottom))
            {
                style.marginBottom = this._options.margin.bottom;
            }

            if(isPresent(this._options.margin.right))
            {
                style.marginRight = this._options.margin.right;
            }

            if(isPresent(this._options.margin.top))
            {
                style.marginTop = this._options.margin.top;
            }

            if(isPresent(this._options.margin.left))
            {
                style.marginLeft = this._options.margin.left;
            }
        }

        if(this._options?.padding)
        {
            if(isPresent(this._options.padding.bottom))
            {
                style.paddingBottom = this._options.padding.bottom;
            }

            if(isPresent(this._options.padding.right))
            {
                style.paddingRight = this._options.padding.right;
            }

            if(isPresent(this._options.padding.top))
            {
                style.paddingTop = this._options.padding.top;
            }

            if(isPresent(this._options.padding.left))
            {
                style.paddingLeft = this._options.padding.left;
            }
        }

        if(this._options?.textStyling)
        {
            if(isPresent(this._options.textStyling.fontSize))
            {
                style.fontSize = this._options.textStyling.fontSize;
            }

            if(isPresent(this._options.textStyling.fontWeight))
            {
                style.fontWeight = this._options.textStyling.fontWeight.toString();
            }
        }
    }
}