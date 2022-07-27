import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {DataBlockComponentOptions} from './dataBlock.options';

/**
 * Data block layout metadata loader
 */
export const DataBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DataBlockComponentOptions>> = async () => new (await import('./metadata/dataBlock.layoutMetadata')).DataBlockLayoutEditorMetadata();

/**
 * Data block relations metadata loader
 */
export const DataBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/dataBlock.relationsMetadata')).DataBlockRelationsEditorMetadata();
