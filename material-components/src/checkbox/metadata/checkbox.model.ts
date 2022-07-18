import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '../../../../layout-editor/src';
import {MaterialCheckboxComponentOptions} from '../checkbox.options';


/**
 * Material checkbox model for properties editor
 */
export class MaterialCheckboxModel implements MaterialCheckboxComponentOptions
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
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}