import {mapValuesToThis} from '@jscrpt/common';

import {SyncValuesRelationsOptions} from '../syncValues.options';

/**
 * Rest relations options model
 */
export class SyncValuesRelationsOptionsModel implements SyncValuesRelationsOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public triggerSync: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    public idleTimeout: number|undefined|null = 0;

    /**
     * @inheritdoc
     */
    public syncProperties: string[]|null|undefined;
    
    //######################### constructor #########################
    constructor(value: SyncValuesRelationsOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}