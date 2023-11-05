import {LayoutPropertyName, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {NumberFieldComponentOptions} from '../numberField.options';
import {FormFieldComponentBaseModel} from '../../../metadata';


/**
 * Number field model for properties editor
 */
export class NumberFieldModel extends FormFieldComponentBaseModel implements NumberFieldComponentOptions
{
    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Min value')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputNumber')
    public min: number|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Max value')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputNumber')
    public max: number|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Decimal places')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputNumber')
    public decimalPlaces: number|undefined|null = null;

    //######################### constructor #########################
    constructor(value: NumberFieldComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}