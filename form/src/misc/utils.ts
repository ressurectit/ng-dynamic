import {Provider} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {FORM_COMPONENTS_PROVIDER, FORM_MODULE_TYPES_PROVIDER} from './providers';
import {FormComponentControlType} from './enums';

/**
 * Providers for layout form subpackage
 */
export function provideFormLayout(): Provider[]
{
    return [
        FORM_COMPONENTS_PROVIDER,
    ];
}

/**
 * Default providers for form subpackage
 */
export function provideFormLayoutEditor(): Provider[]
{
    return [
        FORM_COMPONENTS_PROVIDER,
        FORM_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('form-components'),
    ];
}

export function getFormControl<TValue = string>(controlName: string|null|undefined, parentControl: AbstractControl|undefined, defaultControlType: FormComponentControlType = FormComponentControlType.FormControl, defaultValue: TValue): AbstractControl
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