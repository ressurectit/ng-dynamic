import {Inject, Injectable, Optional} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Logger, LOGGER} from '@anglr/common';

import {LayoutComponentsIterator} from './layoutComponents.iterator';
import {LayoutEditorMetadataExtractor} from '../layoutEditorMetadataExtractor/layoutEditorMetadataExtractor.service';
import {LayoutComponentsChildrenIterator} from './layoutComponentsChildren.iterator';

/**
 * Service used for creating LayoutComponentsIterator
 */
@Injectable()
export class LayoutComponentsIteratorService
{
    //######################### constructor #########################
    constructor(protected extractor: LayoutEditorMetadataExtractor,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets iterator for specified layout metadata
     * @param layoutMetadata - Metadata for which will be iterator created
     */
    public getIteratorFor(layoutMetadata: LayoutComponentMetadata): LayoutComponentsIterator
    {
        return new LayoutComponentsIterator(layoutMetadata, this.extractor, this.logger);
    }
    
    /**
     * Gets children iterator for specified layout metadata
     * @param layoutMetadata - Metadata for which will be children iterator created
     */
    public getChildrenIteratorFor(layoutMetadata: LayoutComponentMetadata): LayoutComponentsChildrenIterator
    {
        return new LayoutComponentsChildrenIterator(layoutMetadata, this.extractor, this.logger);
    }
}