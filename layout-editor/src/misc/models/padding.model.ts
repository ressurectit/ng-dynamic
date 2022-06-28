import {Padding} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyDescription, LayoutPropertyName} from '../../decorators';

/**
 * Padding model for properties editor
 */
export class PaddingModel implements Padding
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding top')
    @LayoutPropertyDescription('Top padding of component')
    top: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding right')
    @LayoutPropertyDescription('Right padding of component')
    right: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding bottom')
    @LayoutPropertyDescription('Bottom padding of component')
    bottom: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Padding left')
    @LayoutPropertyDescription('Left padding of component')
    left: string|undefined|null = null;

    //######################### constructor #########################
    constructor(value: Padding|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}