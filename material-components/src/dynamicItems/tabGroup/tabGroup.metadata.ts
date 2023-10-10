import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialTabGroupComponentOptions} from './tabGroup.options';

/**
 * Material tab group layout metadata loader
 */
export const MaterialTabGroupLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTabGroupComponentOptions>> = async () => new (await import('./metadata/tabGroup.layoutMetadata')).MaterialTabGroupLayoutEditorMetadata();