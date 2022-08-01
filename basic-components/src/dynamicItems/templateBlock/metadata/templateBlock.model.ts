import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {TemplateBlockComponentOptions} from '../templateBlock.options';

/**
 * Template block model for properties editor
 */
export class TemplateBlockModel implements TemplateBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Layout id')
    @LayoutPropertyDescription('Id of layout template to be used')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public layoutId: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: TemplateBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}