import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';

import {ComponentStylingOptions} from '../../interfaces';

/**
 * Extension that applies common component styling to component
 */
export class ComponentStylingExtension extends DynamicItemExtensionBase<ComponentStylingOptions> implements DynamicItemExtension<ComponentStylingOptions>
{
    //######################### protected properties #########################

    /**
     * Value of last css class
     */
    protected lastCssClass: string|undefined|null;

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this._applyStyling();
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsChange(): void
    {
        this._applyStyling();
    }

    //######################### protected methods #########################

    /**
     * Applies component styling to element
     */
    protected _applyStyling(): void
    {
        const options = this.options;
        const style = this.element?.nativeElement.style;

        if(this.element)
        {
            if(isPresent(this.lastCssClass))
            {
                for(const cssClass of this.lastCssClass.split(' '))
                {
                    this.element.nativeElement.classList.remove(cssClass);
                }
            }

            this.lastCssClass = options?.cssClass;

            if(options?.cssClass)
            {
                for(const cssClass of options.cssClass.split(' '))
                {
                    this.element?.nativeElement.classList.add(cssClass);
                }
            }
        }

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
}