import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {TextFieldComponentOptions} from './textField.options';

/**
 *  text field layout metadata loader
 */
export const TextFieldLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<TextFieldComponentOptions>> = async () => new (await import('./metadata/textField.layoutMetadata')).TextFieldLayoutEditorMetadata();

/**
 *  text field relations metadata loader
 */
export const TextFieldRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/textField.relationsMetadata')).TextFieldRelationsEditorMetadata();