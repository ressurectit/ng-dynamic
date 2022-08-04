import {FormComponentControlType} from './enums';

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
    controlType: FormComponentControlType = FormComponentControlType.FormControl;
}
