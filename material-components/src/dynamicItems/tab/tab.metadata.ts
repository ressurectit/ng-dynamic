import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialTabComponentOptions} from './tab.options';

/**
 * Material tab layout metadata loader
 */
export const MaterialTabLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTabComponentOptions>> = async () => new (await import('./metadata/tab.layoutMetadata')).MaterialTabLayoutEditorMetadata();

/**
 * Material tab relations metadata loader
 */
export const MaterialTabRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/tab.relationsMetadata')).MaterialTabRelationsEditorMetadata();
