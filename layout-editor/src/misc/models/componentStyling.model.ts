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
    margin?: Margin|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding')
    @LayoutPropertyDescription('Padding of component')
    padding?: Padding|undefined|null = null;

    /**
     * @inheritdoc
     */
    textStyling?: TextStyling|undefined|null = null;

    //######################### constructor #########################
    constructor(value: ComponentStylingOptions)
    {
        mapValuesToThis.bind(this)(value);
    }
}