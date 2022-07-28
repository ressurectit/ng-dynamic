import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialCheckboxComponentOptions} from '../checkbox.options';


/**
 * Material checkbox model for properties editor
 */
export class MaterialCheckboxModel extends FormComponentBaseModel implements MaterialCheckboxComponentOptions
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
    constructor(value: MaterialCheckboxComponentOptions|undefined|null)
    {
        super(value);
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}