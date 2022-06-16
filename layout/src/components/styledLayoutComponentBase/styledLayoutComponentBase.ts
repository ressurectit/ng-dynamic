import {ChangeDetectorRef, Directive, ElementRef, HostBinding} from '@angular/core';

import {ComponentStylingOptions, ComponentStylingSADirective} from '../../directives';
import {StyledLayoutComponent} from '../../interfaces';
import {LayoutComponentBase} from '../layoutComponentBase/layoutComponentBase';

/**
 * Base component for layout component which allows to be styled
 */
@Directive()
export abstract class StyledLayoutComponentBase<TOptions> extends LayoutComponentBase<TOptions&ComponentStylingOptions> implements StyledLayoutComponent<TOptions&ComponentStylingOptions>
{
    //######################### public properties - host #########################

    /**
     * Instance of attached component styling directive
     */
    @HostBinding('attr.componentStyling')
    public _componentStyling: ComponentStylingSADirective = new ComponentStylingSADirective(this._element);

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,)
    {
        super(changeDetector);
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public override invalidateVisuals(): void
    {
        this._componentStyling.options = this.options;

        this._changeDetector.detectChanges();
    }
}