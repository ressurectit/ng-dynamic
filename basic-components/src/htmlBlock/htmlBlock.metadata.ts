import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {HtmlBlockComponentOptions} from './htmlBlock.options';

/**
 * Html block layout metadata loader
 */
export const HtmlBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<HtmlBlockComponentOptions>> = async () => new (await import('./metadata/htmlBlock.layoutMetadata')).HtmlBlockLayoutEditorMetadata();

/**
 * Html block relations metadata loader
 */
export const HtmlBlockRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/htmlBlock.relationsMetadata')).HtmlBlockRelationsEditorMetadata();
