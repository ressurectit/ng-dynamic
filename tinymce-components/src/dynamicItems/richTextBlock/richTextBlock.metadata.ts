import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {RichTextBlockComponentOptions} from './richTextBlock.options';

/**
 * Rich text block layout metadata loader
 */
export const RichTextBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<RichTextBlockComponentOptions>> = async () => new (await import('./metadata/richTextBlock.layoutMetadata')).RichTextBlockLayoutEditorMetadata();
