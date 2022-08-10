import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialRadioComponentOptions} from './radio.options';

/**
 * Material radio layout metadata loader
 */
export const MaterialRadioLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialRadioComponentOptions>> = async () => new (await import('./metadata/radio.layoutMetadata')).MaterialRadioLayoutEditorMetadata();

/**
 * Material radio relations metadata loader
 */
export const MaterialRadioRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/radio.relationsMetadata')).MaterialRadioRelationsEditorMetadata();