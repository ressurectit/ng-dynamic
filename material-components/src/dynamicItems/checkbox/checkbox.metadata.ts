import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialCheckboxComponentOptions} from './checkbox.options';

/**
 * Material checkbox layout metadata loader
 */
export const MaterialCheckboxLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialCheckboxComponentOptions>> = async () => new (await import('./metadata/checkbox.layoutMetadata')).MaterialCheckboxLayoutEditorMetadata();