import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialRadioComponentOptions} from '../radio.options';


/**
 * Material radio model for properties editor
 */
export class MaterialRadioModel extends FormComponentBaseModel implements MaterialRadioComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Options')
    @LayoutPropertyDescription('Radio options')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public options: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: MaterialRadioComponentOptions|undefined|null)
    {
        super(value);
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}