import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {StyleBlockComponentOptions} from './styleBlock.options';

/**
 * Style block layout metadata loader
 */
export const StyleBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<StyleBlockComponentOptions>> = async () => new (await import('./metadata/styleBlock.layoutMetadata')).StyleBlockLayoutEditorMetadata();
