import {isPresent} from '@jscrpt/common';

import {MissingTypeBehavior} from '../../misc/enums';

/**
 * Options for LayoutRendererOptions
 */
export class LayoutRendererOptions
{
    //######################### public properties #########################

    /**
     * Describes what should happen if layout component type described in metadata was not found
     */
    public missingTypeBehavior: MissingTypeBehavior = MissingTypeBehavior.ShowNotFound;

    //######################### constructor #########################
    constructor(missingTypeBehavior?: MissingTypeBehavior)
    {
        if(isPresent(missingTypeBehavior))
        {
            this.missingTypeBehavior = missingTypeBehavior;
        }
    }
}