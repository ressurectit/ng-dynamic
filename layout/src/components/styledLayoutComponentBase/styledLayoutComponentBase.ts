import {ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

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
                element: ElementRef<HTMLElement>,
                @Inject(LOGGER) @Optional() logger?: Logger,)
    {
        super(changeDetector, element, logger);
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