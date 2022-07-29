import {mapValuesToThis} from '@jscrpt/common';

import {RestParam} from '../misc/interfaces';
import {MethodType} from '../misc/types';
import {RestRelationsOptions} from '../rest.options';

/**
 * Rest relations options model
 */
export class RestRelationsOptionsModel implements RestRelationsOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public url: string|undefined|null = '';

    /**
     * @inheritdoc
     */
    public method: MethodType|undefined|null = 'GET';

    /**
     * @inheritdoc
     */
    public runImmediately: boolean|undefined|null = true;

    /**
     * @inheritdoc
     */
    public params: RestParam[]|undefined|null;
    
    //######################### constructor #########################
    constructor(value: RestRelationsOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}