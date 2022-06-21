import {Inject, Injectable, Optional} from '@angular/core';
import {AsyncProperties, DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataType} from '../../interfaces';

/**
 * Class used for extracting layout editor metadata
 */
@Injectable({providedIn: 'root'})
export class LayoutEditorMetadataExtractor
{
    //######################### constructor #########################
    constructor(protected _loader: DynamicItemLoader,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }
    
    //######################### public methods #########################

    /**
     * Extracts layout editor metadata from layout metadata
     * @param metadata - Metadata describing type that contains metadata
     */
    public async extractMetadata(metadata: LayoutComponentMetadata): Promise<AsyncProperties<LayoutEditorMetadataDescriptor>|null>
    {
        const type = await this._loader.loadItem(metadata);

        if(!type)
        {
            return null;
        }

        const metadataType = type.type as unknown as LayoutEditorMetadataType;

        if(!metadataType.layoutEditorMetadata)
        {
            this._logger?.warn('LayoutEditorMetadataExtractor: Missing metadata! ', {package: metadata.package, name: metadata.name});

            return null;
        }

        return metadataType.layoutEditorMetadata;
    }
}