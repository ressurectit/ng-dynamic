import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialCheckboxComponentOptions} from './checkbox.options';

/**
 * Material checkbox layout metadata loader
 */
export const MaterialCheckboxLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialCheckboxComponentOptions>> = async () => new (await import('./metadata/checkbox.layoutMetadata')).MaterialCheckboxLayoutEditorMetadata();

/**
 * Material checkbox relations metadata loader
 */
export const MaterialCheckboxRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/checkbox.relationsMetadata')).MaterialCheckboxRelationsEditorMetadata();