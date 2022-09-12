import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {mapValuesToThis} from '@jscrpt/common';

import {RadioComponentOptions} from '../radio.options';


/**
 * Radio model for properties editor
 */
export class RadioModel extends FormComponentBaseModel implements RadioComponentOptions
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
    constructor(value: RadioComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);
    }
}