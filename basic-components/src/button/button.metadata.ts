import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {ButtonComponentOptions} from './button.options';

/**
 * Button layout metadata loader
 */
export const ButtonLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<ButtonComponentOptions>> = async () => new (await import('./metadata/button.layoutMetadata')).ButtonLayoutEditorMetadata();

/**
 * Button relations metadata loader
 */
export const ButtonRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/button.relationsMetadata')).ButtonRelationsEditorMetadata();
