import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemLoader, DynamicItemSource} from '@anglr/dynamic';
import {LayoutComponentDef, LAYOUT_COMPONENTS_LOADER} from '@anglr/dynamic/layout';
import {LOGGER, Logger} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataType} from '../../decorators';

/**
 * Class used for extracting layout editor metadata
 */
@Injectable({providedIn: 'root'})
export class LayoutEditorMetadataExtractor
{
    //######################### protected fields #########################

    /**
     * Cache for layout editor metadata
     */
    protected _cache: Dictionary<LayoutEditorMetadataDescriptor> = {};

    //######################### constructor #########################
    constructor(@Inject(LAYOUT_COMPONENTS_LOADER) protected _loader: DynamicItemLoader<LayoutComponentDef>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }
    
    //######################### public methods #########################

    /**
     * Extracts layout editor metadata from layout metadata
     * @param metadata - Metadata describing type that contains metadata
     */
    public async extractMetadata(metadata: DynamicItemSource): Promise<LayoutEditorMetadataDescriptor|null>
    {
        const cacheId = `${metadata.package}-${metadata.name}`;

        if(this._cache[cacheId])
        {
            return this._cache[cacheId];
        }

        const type = await this._loader.loadItem(metadata);

        if(!type)
        {
            return null;
        }

        const metadataType = type.data as unknown as LayoutEditorMetadataType;

        if(!metadataType.layoutEditorMetadata)
        {
            this._logger?.warn('LayoutEditorMetadataExtractor: Missing metadata! ', {package: metadata.package, name: metadata.name});

            return null;
        }

        this._logger?.debug('LayoutEditorMetadataExtractor: Reading metadata! ', {package: metadata.package, name: metadata.name});

        const metadataData = await metadataType.layoutEditorMetadata;
        Object.freeze(metadataData);

        this._cache[cacheId] = metadataData;

        return metadataData;
    }
}