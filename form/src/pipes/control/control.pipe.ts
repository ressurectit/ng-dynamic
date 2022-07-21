import {Inject, Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {LOGGER, Logger} from '@anglr/common';

import {FormComponentControlType} from '../../misc/enums';

/**
 * Transforms control name to FormControl|FormArray|FormGroup
 */
@Pipe({name: 'formComponentControl', standalone: true})
export class FormComponentControlSAPipe implements PipeTransform
{
    constructor(@Inject(LOGGER) protected _logger: Logger,)
    {}

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Transforms control name to FormControl|FormArray|FormGroup
     */
    public transform(controlName: string|null|undefined, parentControl: AbstractControl|undefined, defaultControlType: FormComponentControlType = FormComponentControlType.FormControl): AbstractControl
    {
        if (!parentControl ||
            !controlName)
        {
            return this._getControlForType(defaultControlType);
        }

        const control = parentControl.get(controlName);

        if (!control)
        {
            this._logger?.warn('FormComponentControlSAPipe: Unable to find control with name {@name}', {name: controlName});
        }

        return control ?? this._getControlForType(defaultControlType);
    }

    //######################### private methods ########################

    /**
     * Generate dummy abstract control of specified type
     * @param type 
     * @returns 
     */
    private _getControlForType(type: FormComponentControlType): FormControl|FormArray|FormGroup
    {
        switch (type)
        {
            case FormComponentControlType.FormArray:
                return new FormArray<any>([]);
            case FormComponentControlType.FormGroup:
                return new FormGroup({});
            default:
                return new FormControl();
        }
    }
}