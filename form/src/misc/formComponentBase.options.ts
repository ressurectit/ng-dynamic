import {Type} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

export class FormComponentOptions
{
    //######################### properties #########################

    /**
     * Control name
     */
    controlName: string|null = null;

    /**
     * Type of form component control
     */
    controlType: Type<FormControl | FormGroup | FormArray>|undefined = FormControl;
}
