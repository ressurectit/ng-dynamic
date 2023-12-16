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
        this.applyStyling();
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsChange(): void
    {
        this.applyStyling();
    }

    //######################### protected methods #########################

    /**
     * Applies component styling to element
     */
    protected applyStyling(): void
    {
        const options = this.options;
        const style = this.element?.nativeElement.style;

        if(this.element)
        {
            if(isPresent(this.lastCssClass))
            {
                for(const cssClass of this.lastCssClass.split(' '))
                {
                    if(cssClass)
                    {
                        this.element.nativeElement.classList.remove(cssClass);
                    }
                }
            }

            this.lastCssClass = options?.cssClass;

            if(options?.cssClass)
            {
                for(const cssClass of options.cssClass.split(' '))
                {
                    if(cssClass)
                    {
                        this.element?.nativeElement.classList.add(cssClass);
                    }
                }
            }
        }

        if(isPresent(style))
        {
            if(options?.margin)
            {
                style.marginBottom = options.margin.bottom ?? '';
                style.marginRight = options.margin.right ?? '';
                style.marginTop = options.margin.top ?? '';
                style.marginLeft = options.margin.left ?? '';
            }

            if(options?.padding)
            {
                style.paddingBottom = options.padding.bottom ?? '';
                style.paddingRight = options.padding.right ?? '';
                style.paddingTop = options.padding.top ?? '';
                style.paddingLeft = options.padding.left ?? '';
            }

            if(options?.textStyling)
            {
                style.fontSize = options.textStyling.fontSize ?? '';
                style.fontWeight = options.textStyling.fontWeight?.toString() ?? '';
            }
        }
    }
}