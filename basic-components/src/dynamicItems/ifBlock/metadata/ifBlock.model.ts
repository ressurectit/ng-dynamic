import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {IfBlockComponentOptions} from '../ifBlock.options';

/**
 * If block model for properties editor
 */
export class IfBlockModel implements IfBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Condition')
    @LayoutPropertyDescription('Initial value of condition used for displaying content of if block')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public condition: boolean|undefined|null = true;
    
    //######################### constructor #########################
    constructor(value: IfBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}