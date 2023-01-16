import {MatFormFieldAppearance} from '@angular/material/form-field';
import {FormFieldComponentOptions} from '@anglr/dynamic/form';

export class MaterialFormFieldComponentOptions extends FormFieldComponentOptions
{
    //######################### properties #########################

    /**
     * Hint text
     */
    hint: string|undefined|null;

    /**
     * Input appearance
     */
    appearance: MatFormFieldAppearance = 'outline';
}
