import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialSelectComponentOptions} from './select.options';

/**
 * Material select layout metadata loader
 */
export const MaterialSelectLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialSelectComponentOptions>> = async () => new (await import('./metadata/select.layoutMetadata')).MaterialSelectLayoutEditorMetadata();