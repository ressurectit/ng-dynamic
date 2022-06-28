import {FormGroupProperty} from '@anglr/common/forms';
import {ComponentStylingOptions, Margin, Padding, TextStyling} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyObject} from '../../decorators';
import {LayoutPropertyMetadata} from '../types';
import {MarginModel} from './margin.model';
import {PaddingModel} from './padding.model';

/**
 * Component styling model for properties editor
 */
export class ComponentStylingModel implements ComponentStylingOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin')
    @LayoutPropertyDescription('Margin of component')
    @LayoutPropertyObject(MarginModel, [LayoutPropertyMetadata])
    @FormGroupProperty()
    margin: Margin|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding')
    @LayoutPropertyDescription('Padding of component')
    @LayoutPropertyObject(PaddingModel, [LayoutPropertyMetadata])
    @FormGroupProperty()
    padding: Padding|undefined|null = null;

    /**
     * @inheritdoc
     */
    textStyling: TextStyling|undefined|null = null;

    //######################### constructor #########################
    constructor(value: ComponentStylingOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);

        this.margin = new MarginModel(value?.margin);
        this.padding = new PaddingModel(value?.padding);
    }
}