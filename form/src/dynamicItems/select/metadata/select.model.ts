import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';

import {SelectComponentOptions} from '../select.options';
import {FormFieldComponentBaseModel} from '../../../metadata';


/**
 * Select model for properties editor
 */
export class SelectModel extends FormFieldComponentBaseModel implements SelectComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Multiple')
    @LayoutPropertyDescription('Indication whether select allow multi selection')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public multiple: boolean|undefined|null = null;
}