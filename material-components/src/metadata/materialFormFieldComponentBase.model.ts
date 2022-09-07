import {MatFormFieldAppearance} from '@angular/material/form-field';
import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes, LayoutPropertyValues} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialFormFieldComponentOptions} from '../misc';

export class MaterialFormFieldComponentBaseModel extends FormComponentBaseModel implements MaterialFormFieldComponentOptions
{
    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Label')
    @LayoutPropertyDescription('Form label')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public label: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Placeholder')
    @LayoutPropertyDescription('Input placeholder')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public placeholder: string|undefined|null = null;

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
    @LayoutPropertyValues<string>(['standard', 'legacy', 'fill', 'outline'])
    public appearance: MatFormFieldAppearance = 'standard';

    //######################### constructor #########################
    constructor(value: MaterialFormFieldComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}