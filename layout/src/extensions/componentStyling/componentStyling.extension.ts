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
    protected override _onInit(): void
    {
        this._applyStyling();
    }

    /**
     * @inheritdoc
     */
    protected override _onOptionsChange(): void
    {
        this._applyStyling();
    }

    //######################### protected methods #########################

    /**
     * Applies component styling to element
     */
    protected _applyStyling(): void
    {
        const options = this._options;
        const style = this._element?.nativeElement.style;

        if(this._element)
        {
            if(isPresent(this.lastCssClass))
            {
                this._element.nativeElement.classList.remove(this.lastCssClass);
            }

            this.lastCssClass = options?.cssClass;

            if(options?.cssClass)
            {
                this._element?.nativeElement.classList.add(options!.cssClass);
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