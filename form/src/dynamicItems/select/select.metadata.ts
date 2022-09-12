import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {SelectComponentOptions} from './select.options';

/**
 * Select layout metadata loader
 */
export const SelectLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<SelectComponentOptions>> = async () => new (await import('./metadata/select.layoutMetadata')).SelectLayoutEditorMetadata();

/**
 * Select relations metadata loader
 */
export const SelectRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/select.relationsMetadata')).SelectRelationsEditorMetadata();