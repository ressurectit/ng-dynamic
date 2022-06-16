import {isPresent} from '@jscrpt/common';

import {MissingTypeBehavior} from './layoutComponentRenderer.types';

/**
 * Options for LayoutComponentRendererDirective
 */
export class LayoutComponentRendererDirectiveOptions
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