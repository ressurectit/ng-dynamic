import {Injector} from '@angular/core';

import {LayoutComponentMetadata} from '../metadata/layoutComponentMetadata.interface';

/**
 * Transformation function that transforms layout component metadata
 */
export interface LayoutComponentTransform
{
    /**
     * Transforms layout component metadata
     * @param metadata - Metadata to be transformed
     * @param injector - Injector used for obtaining dependencies
     */
    (metadata: LayoutComponentMetadata, injector: Injector): LayoutComponentMetadata;
} 