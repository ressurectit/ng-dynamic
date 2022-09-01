import {ChangeDetectorRef, Directive, ElementRef, Inject, Injector, Input, Optional} from '@angular/core';
import {AbstractControl, FormControl, Validators} from '@angular/forms';
import {LayoutComponentBase} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicOutput} from '@anglr/dynamic/relations';
import {PromiseOr} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {FORM_COMPONENT_CONTROL} from '../../misc/tokens';
import {FormComponentOptions} from '../../misc/formComponentBase.options';
import {FormComponentControlType} from '../../misc/enums';
import {getControlForType, getFormControl} from '../../misc/utils';

/**
 * Base component for form component
 */
@Directive()
export abstract class FormComponentBase<TOptions extends FormComponentOptions, TValue = string> extends LayoutComponentBase<TOptions>
{
    //######################### private properties #########################

    /**
     * Indication whether form component is required
     */
    private _required: boolean|null|undefined;

    /**
     * Indication whether form component is disabled
     */
    private _disabled: boolean|null|undefined;

    //######################### protected properties #########################

    /**
     * Form component control
     */
    protected control: AbstractControl = new FormControl();

    /**
     * Form component control subscriptions
     */
    protected controlSubscription: Subscription|null|undefined;

    //######################### public properties - inputs #########################

    /**
     * Form component value
     */
    @Input()
    public set value(value: TValue|null|undefined)
    {
        const oldValue = this.value;
        this.valueOutput = value;

        if (value !== oldValue)
        {
            this.control?.patchValue(value);
        }
    }
    public get value(): TValue|null|undefined
    {
        return this.valueOutput;
    }

    /**
     * Indication whether form component is required
     */
    @Input()
    public set required(value: boolean|null|undefined)
    {
        this._required = value;

        if (value === true)
        {
            this.control?.addValidators(Validators.required);
            return;
        }

        this.control?.removeValidators(Validators.required);
    }
    public get required(): boolean|null|undefined
    {
        return this._required;
    }

    /**
     * Indication whether form component is disabled
     */
    @Input()
    public set disabled(value: boolean|null|undefined)
    {
        this._disabled = value;

        if (value === true)
        {
            this.control?.disable();
            return;
        }

        this.control?.enable();
    }
    public get disabled(): boolean|null|undefined
    {
        return this._disabled;
    }

    //######################### public properties - dynamicOutputs #########################

    /**
     * Form component value
     */
    @DynamicOutput()
    public valueOutput: TValue|null|undefined;

    //######################### constructor #########################

    constructor(_changeDetector: ChangeDetectorRef,
                _element: ElementRef<HTMLElement>,
                _injector: Injector,
                @Inject(FORM_COMPONENT_CONTROL) @Optional() protected _parentControl?: AbstractControl,
                @Inject(LOGGER) @Optional() _logger?: Logger,)
    {
        super(_changeDetector, _element, _injector, _logger);
    }

    //######################### protected methods - _onOptionsSet implementation #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): PromiseOr<void> 
    {
        if(!this.options)
        {
            return;
        }

        this.controlSubscription?.unsubscribe();
        this.controlSubscription = null;

        this.control = this._getFormControl(this.options?.controlName, this._parentControl, FormComponentControlType.FormControl, this.value); 
        this._registerValidations();

        this.controlSubscription = this.control
            ?.valueChanges
            ?.subscribe(value => 
            {
                this.valueOutput = value;
            });
    }

    //######################### protected methods #########################

    /**
     * Registers component-specific validators
     */
    protected _registerValidations(): void
    {}

    //######################### private methods #########################

    /**
     * Gets form component control for control name
     * @param controlName Form component control name
     * @param parentControl Parent form control
     * @param defaultControlType Default control type when parent does not exists or not contains control with specified name
     * @param initValue Initial value for control
     * @returns Specified type of control
     */
    private _getFormControl(controlName: string|null|undefined, parentControl: AbstractControl|undefined, defaultControlType: FormComponentControlType = FormComponentControlType.FormControl, initValue: TValue|null|undefined): AbstractControl
    {
        let control = getFormControl(controlName, parentControl, defaultControlType, initValue);

        if (!control)
        {
            this.logger?.warn('FormComponentBase: Unable to find control with name {@name}', {name: controlName});

            control = getControlForType(defaultControlType, initValue);
        }

        if (this.required)
        {
            control.addValidators(Validators.required);
        }

        if (this.disabled)
        {
            control.disable();
        }

        return control;
    }
}