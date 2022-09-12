import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {CheckboxComponentOptions} from '../checkbox.options';


/**
 * Checkbox model for properties editor
 */
export class CheckboxModel extends FormComponentBaseModel implements CheckboxComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Label')
    @LayoutPropertyDescription('Form label')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public label: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: CheckboxComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}