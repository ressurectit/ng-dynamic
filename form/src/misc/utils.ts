import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

import {FormComponentControlType} from './enums';

export function getFormControl<TValue = string>(controlName: string|undefined|null, parentControl: AbstractControl|undefined|null, defaultControlType: FormComponentControlType = FormComponentControlType.FormControl, defaultValue: TValue): AbstractControl
{
    if (!parentControl ||
        !controlName)
    {
        return getControlForType(defaultControlType, defaultValue);
    }

    const control = parentControl.get(controlName);



    return control ?? getControlForType(defaultControlType, defaultValue);
}

export function getControlForType<TValue = string>(type: FormComponentControlType, defaultValue: TValue): FormControl|FormArray|FormGroup
{
    //TODO fix default value for form array
    switch (type)
    {
        case FormComponentControlType.FormArray:
            return new FormArray<any>([]);
        case FormComponentControlType.FormGroup:
            return new FormGroup(defaultValue ?? {});
        default:
            return new FormControl(defaultValue);
    }
}