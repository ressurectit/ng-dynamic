import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary, mapValuesToThis} from '@jscrpt/common';

import {CustomComponentComponentOptions} from '../customComponent.options';

/**
 * Custom component model for properties editor
 */
export class CustomComponentModel implements CustomComponentComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public name: string = '';

    /**
     * @inheritdoc
     */
    public placeholderContainers: Dictionary<LayoutComponentMetadata>|undefined|null;

    /**
     * @inheritdoc
     */
    public contentOptions: Dictionary<unknown> = {};

    //######################### constructor #########################
    constructor(value: CustomComponentComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}