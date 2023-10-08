import {mapValuesToThis} from '@jscrpt/common';

import {MathRoundRelationsOptions} from '../round.options';

/**
 * Math round relations options model
 */
export class MathRoundRelationsOptionsModel implements MathRoundRelationsOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public input: number|undefined|null = null;

    /**
     * @inheritdoc
     */
    public decimalPlace: number|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: MathRoundRelationsOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}