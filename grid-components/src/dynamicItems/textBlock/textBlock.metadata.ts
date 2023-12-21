import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {TextBlockComponentOptions} from './textBlock.options';

/**
 * Text block layout metadata loader
 */
export const TextBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<TextBlockComponentOptions>> = async () => new (await import('./metadata/textBlock.layoutMetadata')).TextBlockLayoutEditorMetadata();