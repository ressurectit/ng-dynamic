import {ChangeDetectorRef, Directive, ElementRef, HostBinding} from '@angular/core';

import {ComponentStylingOptions, ComponentStylingSADirective} from '../../directives';
import {StyledLayoutComponent} from '../../interfaces';

/**
 * Base component for layout component which allows to be styled
 */
@Directive()
export abstract class StyledLayoutComponentBase<TOptions> implements StyledLayoutComponent<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options used for rendering this component
     */
    protected _options: (TOptions&ComponentStylingOptions)|undefined|null;

    //######################### public properties - implementation of LayoutComponent #########################

    /**
     * Options used for rendering this component
     */
    public get options(): (TOptions&ComponentStylingOptions)|undefined|null
    {
        return this._options;
    }
    public set options(value: (TOptions&ComponentStylingOptions)|undefined|null)
    {
        this._options = value;

        this._optionsSet();
    }

    //######################### public properties - host #########################

    /**
     * Instance of attached component styling directive
     */
    @HostBinding('attr.componentStyling')
    public _componentStyling: ComponentStylingSADirective = new ComponentStylingSADirective(this._element);

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,)
    {
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._componentStyling.options = this.options;

        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Method that is called when options are set, allows to hook to changing of options
     */
    protected _optionsSet(): void
    {
    }
}