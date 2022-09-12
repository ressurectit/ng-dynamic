import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {RadioComponentOptions} from './radio.options';

/**
 * Radio layout metadata loader
 */
export const RadioLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<RadioComponentOptions>> = async () => new (await import('./metadata/radio.layoutMetadata')).RadioLayoutEditorMetadata();

/**
 * Radio relations metadata loader
 */
export const RadioRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/radio.relationsMetadata')).RadioRelationsEditorMetadata();