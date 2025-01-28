import {Inject, Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {LOGGER, Logger} from '@anglr/common';

import {FormComponentControlType} from '../../misc/enums';
import {getControlForType, getFormControl} from '../../misc/utils';

/**
 * Transforms control name to FormControl|FormArray|FormGroup
 */
@Pipe({name: 'formComponentControl'})
export class FormComponentControlPipe implements PipeTransform
{
    constructor(@Inject(LOGGER) protected _logger: Logger,)
    {}

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms control name to FormControl|FormArray|FormGroup
     */
    public transform<TValue = string>(controlName: string|null|undefined, parentControl: AbstractControl|undefined, defaultControlType: FormComponentControlType = FormComponentControlType.FormControl, defaultValue?: TValue): AbstractControl
    {
        const control = getFormControl(controlName, parentControl, defaultControlType, defaultValue);

        if (!control)
        {
            this._logger?.warn('FormComponentControlPipe: Unable to find control with name {{@name}}', {name: controlName});
        }

        return control ?? getControlForType(defaultControlType, defaultValue);
    }
}