import {FormGroupProperty} from '@anglr/common/forms';
import {ComponentStylingOptions, Margin, Padding, TextStyling} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyObject, LayoutPropertyType} from '../../decorators';
import {DefaultKnownPropertyTypes, LayoutPropertyMetadata} from '../types';
import {MarginModel} from './margin.model';
import {PaddingModel} from './padding.model';

/**
 * Component styling model for properties editor
 */
export class ComponentStylingModel implements ComponentStylingOptions
{
    //######################### public properties #########################

    @LayoutPropertyName('Css class')
    @LayoutPropertyDescription('Css class that should be applied to component')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public cssClass: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin')
    @LayoutPropertyDescription('Margin of component')
    @LayoutPropertyObject(MarginModel, [LayoutPropertyMetadata])
    @FormGroupProperty()
    public margin: Margin|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding')
    @LayoutPropertyDescription('Padding of component')
    @LayoutPropertyObject(PaddingModel, [LayoutPropertyMetadata])
    @FormGroupProperty()
    public padding: Padding|undefined|null = null;

    /**
     * @inheritdoc
     */
    public textStyling: TextStyling|undefined|null = null;

    //######################### constructor #########################
    constructor(value: ComponentStylingOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);

        this.margin = new MarginModel(value?.margin);
        this.padding = new PaddingModel(value?.padding);
    }
}