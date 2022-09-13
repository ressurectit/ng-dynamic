import {mapValuesToThis} from '@jscrpt/common';

import {RestParam} from '../../interfaces';
import {ParamType} from '../../types';

/**
 * Rest param model
 */
export class RestParamModel implements RestParam
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
    public value: any;

    /**
     * @inheritdoc
     */
    public name: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: RestParam|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}