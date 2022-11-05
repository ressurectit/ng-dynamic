import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {BlockComponentOptions} from './block.options';

/**
 * Block layout metadata loader
 */
export const BlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<BlockComponentOptions>> = async () => new (await import('./metadata/block.layoutMetadata')).BlockLayoutEditorMetadata();
