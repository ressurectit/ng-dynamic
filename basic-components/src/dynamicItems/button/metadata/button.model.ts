import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {ButtonComponentOptions} from '../button.options';

/**
 * Button model for properties editor
 */
export class ButtonModel implements ButtonComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Text')
    @LayoutPropertyDescription('Text to be displayed in button')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public text: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Disabled')
    @LayoutPropertyDescription('Indication whether is button disabled')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public disabled: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Button css class')
    @LayoutPropertyDescription('Css class applied to button element itself')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public buttonCssClass: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: ButtonComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}