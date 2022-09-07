import {mapValuesToThis} from '@jscrpt/common';

import {RelationsNodeProperties} from './relationsNodePropertiesEditor.interface';

/**
 * Relations node properties model
 */
export class RelationsNodePropertiesModel implements RelationsNodeProperties
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public displayName: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    public scope: string|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: RelationsNodeProperties|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}