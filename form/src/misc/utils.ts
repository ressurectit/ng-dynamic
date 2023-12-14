import {Provider} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {FORM_COMPONENTS_PROVIDER, FORM_MODULE_TYPES_PROVIDER, FORM_RELATIONS_COMPONENTS_PROVIDER, FORM_RELATIONS_MODULE_TYPES_PROVIDER, FORM_RELATIONS_NODES_PROVIDER} from './providers';
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
 * Providers for layout form subpackage
 */
export function provideFormRelations(): Provider[]
{
    return [
        FORM_RELATIONS_COMPONENTS_PROVIDER,
    ];
}

/**
 * Default providers for form subpackage layout
 */
export function provideFormLayoutEditor(): Provider[]
{
    return [
        FORM_COMPONENTS_PROVIDER,
        FORM_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('form-components'),
    ];
}

/**
 * Default providers for form subpackage relations
 */
export function provideFormRelationsEditor(): Provider[]
{
    return [
        FORM_RELATIONS_MODULE_TYPES_PROVIDER,
        FORM_RELATIONS_NODES_PROVIDER,
        provideStaticPackageSource('form-components'),
    ];
}

 
/**
 * Providers for layout relations editor form subpackage
 */
export function provideFormLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideFormRelationsEditor(),
        ...provideFormLayout(),
    ];
}


/**
 * Providers for layout relations form subpackage
 */
export function provideFormLayoutRelations(): Provider[]
{
    return [
        ...provideFormLayout(),
        ...provideFormRelations(),
    ];
}

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