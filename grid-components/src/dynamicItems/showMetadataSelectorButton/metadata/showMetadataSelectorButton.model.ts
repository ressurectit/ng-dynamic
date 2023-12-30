import {mapValuesToThis} from '@jscrpt/common';

import {ShowMetadataSelectorButtonComponentOptions} from '../showMetadataSelectorButton.options';

/**
 * Show metadata selector button model for properties editor
 */
export class ShowMetadataSelectorButtonModel implements ShowMetadataSelectorButtonComponentOptions
{
    //######################### public properties #########################

    
    //######################### constructor #########################
    constructor(value: ShowMetadataSelectorButtonComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}