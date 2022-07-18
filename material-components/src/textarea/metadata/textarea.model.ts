import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes, LayoutPropertyValues} from '../../../../layout-editor/src';
import {MaterialTextareaComponentOptions} from '../textarea.options';


/**
 * Material textarea model for properties editor
 */
export class MaterialTextareaModel implements MaterialTextareaComponentOptions
{
    //######################### public properties #########################

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
    public appearance: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: MaterialTextareaComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}