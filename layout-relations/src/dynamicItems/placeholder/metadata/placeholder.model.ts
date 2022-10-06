import {mapValuesToThis} from '@jscrpt/common';

import {PlaceholderComponentOptions} from '../placeholder.options';

/**
 * Placeholder model for properties editor
 */
export class PlaceholderModel implements PlaceholderComponentOptions
{
    //######################### constructor #########################
    constructor(value: PlaceholderComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}