import {ChangeDetectorRef, Directive, ElementRef, Inject, Injector, Optional} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';

import {FORM_COMPONENT_CONTROL} from '../../misc/tokens';
import {FormComponentOptions} from '../../misc/formComponentBase.options';

/**
 * Base component for form component
 */
@Directive()
export abstract class FormComponentBase<TOptions extends FormComponentOptions> extends LayoutComponentBase<TOptions>
{
    constructor(_changeDetector: ChangeDetectorRef,
                _element: ElementRef<HTMLElement>,
                _injector: Injector,
                @Inject(FORM_COMPONENT_CONTROL) @Optional() protected _control?: AbstractControl,
                @Inject(LOGGER) @Optional() _logger?: Logger,)
    {
        super(_changeDetector, _element, _injector, _logger);
    }
}