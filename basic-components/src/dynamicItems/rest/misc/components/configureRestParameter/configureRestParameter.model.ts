import {mapValuesToThis} from '@jscrpt/common';

import {RestParam} from '../../interfaces';
import {ParamType} from '../../types';

/**
 * Rest param model
 */
export class RestParamModel implements RestParam<string>
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public type: ParamType = 'PATH';

    /**
     * @inheritdoc
     */
    public configurable: boolean = false;

    /**
     * @inheritdoc
     */
    public value: string = '';

    /**
     * @inheritdoc
     */
    public name: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: RestParam|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}