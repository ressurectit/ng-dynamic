import {mapValuesToThis} from '@jscrpt/common';

import {PlaceholderContainerComponentOptions} from '../placeholderContainer.options';

/**
 * Placeholder container model for properties editor
 */
export class PlaceholderContainerModel implements PlaceholderContainerComponentOptions
{
    //######################### constructor #########################
    constructor(value: PlaceholderContainerComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}