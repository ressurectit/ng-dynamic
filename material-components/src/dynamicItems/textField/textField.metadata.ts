import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialTextFieldComponentOptions} from './textField.options';

/**
 * Material text field layout metadata loader
 */
export const MaterialTextFieldLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTextFieldComponentOptions>> = async () => new (await import('./metadata/textField.layoutMetadata')).MaterialTextFieldLayoutEditorMetadata();

/**
 * Material text field relations metadata loader
 */
export const MaterialTextFieldRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/textField.relationsMetadata')).MaterialTextFieldRelationsEditorMetadata();