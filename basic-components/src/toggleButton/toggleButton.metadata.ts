import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {ToggleButtonComponentOptions} from './toggleButton.options';

/**
 * Toggle button layout metadata loader
 */
export const ToggleButtonLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<ToggleButtonComponentOptions>> = async () => new (await import('./metadata/toggleButton.layoutMetadata')).ToggleButtonLayoutEditorMetadata();

/**
 * Toggle button relations metadata loader
 */
export const ToggleButtonRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/toggleButton.relationsMetadata')).ToggleButtonRelationsEditorMetadata();
