import {mapValuesToThis} from '@jscrpt/common';

import {ComponentEndpointDef} from '../../interfaces';

/**
 * Component endopoint model
 */
export class ComponentEndpointModel<TValue = any> implements ComponentEndpointDef<TValue>
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public defaultValue: TValue|undefined|null = null;

    /**
     * @inheritdoc
     */
    public name: string = '';
    
    //######################### constructor #########################
    constructor(value: ComponentEndpointDef|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}