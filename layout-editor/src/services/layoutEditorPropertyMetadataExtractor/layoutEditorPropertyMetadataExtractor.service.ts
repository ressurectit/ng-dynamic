import {Inject, Injectable, Optional, Type} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, extend} from '@jscrpt/common';

import {LayoutEditorPropertyMetadata} from '../../misc/types';
import {LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES} from '../../misc/tokens';

/**
 * Service used for extracting property metadata
 */
@Injectable({providedIn: 'root'})
export class LayoutEditorPropertyMetadataExtractor
{
    //######################### constructor #########################
    constructor(@Inject(LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES) protected _layoutPropertiesSymbols: symbol[],
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods #########################
    
    /**
     * Extracts properties metadata from type
     * @param type - Type to be examined
     */
    public extract<TMetadata extends LayoutEditorPropertyMetadata = LayoutEditorPropertyMetadata>(type?: Type<any>): Dictionary<TMetadata>|null
    {
        if(!type)
        {
            return null;
        }

        this._logger?.debug(`LayoutEditorPropertyMetadataExtractor: Trying to extract properties metadata '${type.name}'`);

        const result = {};

        for(const propSymbol of this._layoutPropertiesSymbols)
        {
            const meta = Reflect.get(type.prototype, propSymbol);

            extend(true, result, meta);
        }

        return result;
    }
}