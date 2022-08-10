import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialNumberFieldComponentOptions} from './numberField.options';

/**
 * Material number field layout metadata loader
 */
export const MaterialNumberFieldLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialNumberFieldComponentOptions>> = async () => new (await import('./metadata/numberField.layoutMetadata')).MaterialNumberFieldLayoutEditorMetadata();

/**
 * Material number field relations metadata loader
 */
export const MaterialNumberFieldRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/numberField.relationsMetadata')).MaterialNumberFieldRelationsEditorMetadata();