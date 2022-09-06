import {isPresent} from '@jscrpt/common';

import {MissingNodeBehavior} from './relationsNodeRenderer.types';

/**
 * Options for RelationsNodeRendererDirective
 */
export class RelationsNodeRendererDirectiveOptions
{
    //######################### public properties #########################

    /**
     * Describes what should happen if relations node type described in metadata was not found
     */
    public missingNodeBehavior: MissingNodeBehavior = MissingNodeBehavior.ShowNotFound;

    //######################### constructor #########################
    constructor(missingNodeBehavior?: MissingNodeBehavior)
    {
        if(isPresent(missingNodeBehavior))
        {
            this.missingNodeBehavior = missingNodeBehavior;
        } 
    }
}