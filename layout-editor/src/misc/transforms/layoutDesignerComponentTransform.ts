import {LayoutComponentMetadata, LayoutComponentTransform} from '@anglr/dynamic/layout';

import {LayoutDesignerComponentOptions} from '../../components/layoutDesigner/layoutDesigner.options';
import {LAYOUT_DESIGNER_COMPONENT_ID_SUFFIX} from '../constants';

/**
 * Transformation function for layout designer component metadata
 * @param metadata - Metadata to be transformed
 */
export const layoutDesignerComponentTransform: LayoutComponentTransform = function(metadata: LayoutComponentMetadata): LayoutComponentMetadata
{
    return {
        id: `${metadata.id}${LAYOUT_DESIGNER_COMPONENT_ID_SUFFIX}`,
        package: '@anglr/dynamic/layout-editor',
        name: 'layout-designer',
        options: <LayoutDesignerComponentOptions>
        {
            typeMetadata: metadata
        }
    };
};