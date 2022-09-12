import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {FormFieldComponentOptions} from '../misc/formFieldBase.options';

export class FormFieldComponentBaseModel extends FormComponentBaseModel implements FormFieldComponentOptions
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

    //######################### constructor #########################
    constructor(value: FormFieldComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}