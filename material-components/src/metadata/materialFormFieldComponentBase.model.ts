import {MatFormFieldAppearance} from '@angular/material/form-field';
import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes, LayoutPropertyValues} from '@anglr/dynamic/layout-editor';
import {FormFieldComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialFormFieldComponentOptions} from '../misc';

export class MaterialFormFieldComponentBaseModel extends FormFieldComponentBaseModel implements MaterialFormFieldComponentOptions
{
    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Hint')
    @LayoutPropertyDescription('Input hint')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public hint: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Appereance')
    @LayoutPropertyDescription('Input appereance')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('selectValue')
    @LayoutPropertyValues<string>(['fill', 'outline'])
    public appearance: MatFormFieldAppearance = 'outline';

    //######################### constructor #########################
    constructor(value: MaterialFormFieldComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}