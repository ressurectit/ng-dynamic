import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialSelectComponentOptions} from './select.options';

/**
 * Material select layout metadata loader
 */
export const MaterialSelectLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialSelectComponentOptions>> = async () => new (await import('./metadata/select.layoutMetadata')).MaterialSelectLayoutEditorMetadata();

/**
 * Material select relations metadata loader
 */
export const MaterialSelectRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/select.relationsMetadata')).MaterialSelectRelationsEditorMetadata();