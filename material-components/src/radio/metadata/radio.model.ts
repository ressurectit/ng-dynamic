import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '../../../../layout-editor/src';
import {MaterialRadioComponentOptions} from '../radio.options';


/**
 * Material radio model for properties editor
 */
export class MaterialRadioModel implements MaterialRadioComponentOptions
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
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}