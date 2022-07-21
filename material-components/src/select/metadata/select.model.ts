import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';

import {MaterialSelectComponentOptions} from '../select.options';
import {MaterialFormFieldComponentBaseModel} from '../../metadata';


/**
 * Material select model for properties editor
 */
export class MaterialSelectModel extends MaterialFormFieldComponentBaseModel implements MaterialSelectComponentOptions
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