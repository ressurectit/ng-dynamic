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
        mapValuesToThis.bind(this)(value);
    }
}