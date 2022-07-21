import {MatFormFieldAppearance} from '@angular/material/form-field';
import {FormComponentOptions} from '@anglr/dynamic/form';

export class MaterialFormFieldComponentOptions extends FormComponentOptions
{
    //######################### properties #########################

    /**
     * Input label
     */
    label: string|undefined|null;

    /**
     * Input placeholder
     */
    placeholder: string|undefined|null;

    /**
     * Hint text
     */
    hint: string|undefined|null;

    /**
     * Input appearance
     */
    appearance: MatFormFieldAppearance = 'standard';
}
