import {Inject, Injectable} from '@angular/core';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponentDef, LayoutComponentMetadata, LAYOUT_COMPONENTS_LOADER} from '@anglr/dynamic/layout';
import {Logger, LOGGER} from '@anglr/common';

import {LayoutComponentsIterator} from './layoutComponents.iterator';
import {LayoutComponentsChildrenIterator} from './layoutComponentsChildren.iterator';

/**
 * Service used for creating LayoutComponentsIterator
 */
@Injectable()
export class LayoutComponentsIteratorService
{
    //######################### constructor #########################
    constructor(@Inject(LAYOUT_COMPONENTS_LOADER) protected loader: DynamicItemLoader<LayoutComponentDef>,
                @Inject(LOGGER) protected logger: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets iterator for specified layout metadata
     * @param layoutMetadata - Metadata for which will be iterator created
     */
    public getIteratorFor(layoutMetadata: LayoutComponentMetadata): LayoutComponentsIterator
    {
        return new LayoutComponentsIterator(layoutMetadata, this.loader, this.logger);
    }
    
    /**
     * Gets children iterator for specified layout metadata
     * @param layoutMetadata - Metadata for which will be children iterator created
     */
    public getChildrenIteratorFor(layoutMetadata: LayoutComponentMetadata): LayoutComponentsChildrenIterator
    {
        return new LayoutComponentsChildrenIterator(layoutMetadata, this.loader, this.logger);
    }
}