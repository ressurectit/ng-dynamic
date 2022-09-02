import {mapValuesToThis} from '@jscrpt/common';

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

    //######################### constructor #########################
    constructor(value: CustomComponentComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}