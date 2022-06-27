import {ComponentStylingOptions, Margin, Padding, TextStyling} from '@anglr/dynamic/layout';
import {ForFormModel, LayoutPropertyDescription, LayoutPropertyName} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

/**
 * Component styling model for properties editor
 */
export class ComponentStylingModel implements ForFormModel<ComponentStylingOptions>
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin')
    @LayoutPropertyDescription('Margin of component')
    margin?: Margin;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding')
    @LayoutPropertyDescription('Padding of component')
    padding?: Padding;

    /**
     * @inheritdoc
     */
    textStyling?: TextStyling;

    //######################### constructor #########################
    constructor(value: ComponentStylingOptions)
    {
        mapValuesToThis.bind(this)(value);
    }
}