import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {ToggleButtonComponentOptions} from '../toggleButton.options';

/**
 * Toggle button model for properties editor
 */
export class ToggleButtonModel implements ToggleButtonComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('ON text')
    @LayoutPropertyDescription('Text to be displayed in toggle button when button is on')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public onText: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('OFF text')
    @LayoutPropertyDescription('Text to be displayed in toggle button when button is off')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public offText: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('State')
    @LayoutPropertyDescription('State of button on or off')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public state: boolean|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Disabled')
    @LayoutPropertyDescription('Indication whether is toggle button disabled')
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
    constructor(value: ToggleButtonComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}