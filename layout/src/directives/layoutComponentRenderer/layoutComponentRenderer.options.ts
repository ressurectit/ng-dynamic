import {isPresent} from '@jscrpt/common';

import {MissingTypeBehavior} from './layoutComponentRenderer.types';

/**
 * Options for LayoutComponentRenderer
 */
export class LayoutComponentRendererOptions
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