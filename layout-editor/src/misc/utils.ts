import {Injector} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic';
import {LayoutComponentTransform} from '@anglr/dynamic/layout';

import {LayoutDesignerComponentOptions} from '../components';

/**
 * Transformation function for layout designer component metadata
 * @param metadata - Metadata to be transformed
 * @param injector - Injector used for obtaining dependencies
 */
export const layoutDesignerComponentTransform: LayoutComponentTransform = function(metadata: LayoutComponentMetadata, injector: Injector): LayoutComponentMetadata
{
    return {
        id: `${metadata.id}-designer`,
        package: '@anglr/dynamic/layout-editor',
        name: 'layout-designer',
        options: <LayoutDesignerComponentOptions>
        {
            typeMetadata: metadata
        }
    };
};