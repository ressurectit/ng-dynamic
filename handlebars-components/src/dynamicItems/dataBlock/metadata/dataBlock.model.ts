import {mapValuesToThis} from '@jscrpt/common';

import {DataBlockComponentOptions} from '../dataBlock.options';

/**
 * Data block model for properties editor
 */
export class DataBlockModel implements DataBlockComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public template: string|undefined|null = '';
    
    //######################### constructor #########################
    constructor(value: DataBlockComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}