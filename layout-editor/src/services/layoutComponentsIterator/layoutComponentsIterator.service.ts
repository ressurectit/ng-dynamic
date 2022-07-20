import {Inject, Injectable, Optional} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Logger, LOGGER} from '@anglr/common';

import {LayoutComponentsIterator} from './layoutComponents.iterator';
import {LayoutEditorMetadataExtractor} from '../layoutEditorMetadataExtractor/layoutEditorMetadataExtractor.service';

/**
 * Service used for creating LayoutComponentsIterator
 */
@Injectable()
export class LayoutComponentsIteratorService
{
    //######################### constructor #########################
    constructor(protected _extractor: LayoutEditorMetadataExtractor,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Gets iterator for specified layout metadata
     * @param layoutMetadata - Metadata for which will be iterator created
     */
    public getIteratorFor(layoutMetadata: LayoutComponentMetadata): LayoutComponentsIterator
    {
        return new LayoutComponentsIterator(layoutMetadata, this._extractor, this._logger);
    }
}