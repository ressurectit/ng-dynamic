import {Margin} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {LayoutPropertyDescription, LayoutPropertyName} from '../../decorators';

/**
 * Margin model for properties editor
 */
export class MarginModel implements Margin
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin top')
    @LayoutPropertyDescription('Top margin of component')
    top: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin right')
    @LayoutPropertyDescription('Right margin of component')
    right: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin bottom')
    @LayoutPropertyDescription('Bottom margin of component')
    bottom: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Margin left')
    @LayoutPropertyDescription('Left margin of component')
    left: string|undefined|null = null;

    //######################### constructor #########################
    constructor(value: Margin|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}