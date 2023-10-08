import {mapValuesToThis} from '@jscrpt/common';

import {MathPowerRelationsOptions} from '../power.options';

/**
 * Math power relations options model
 */
export class MathPowerRelationsOptionsModel implements MathPowerRelationsOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public input: number|undefined|null = null;

    /**
     * @inheritdoc
     */
    public exponent: number|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: MathPowerRelationsOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}