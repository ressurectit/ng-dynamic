import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {PlaceholderContainerComponentOptions} from '../placeholderContainer.options';

/**
 * Placeholder container model for properties editor
 */
export class PlaceholderContainerModel implements PlaceholderContainerComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public content: LayoutComponentMetadata|undefined|null;

    //######################### constructor #########################
    constructor(value: PlaceholderContainerComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}