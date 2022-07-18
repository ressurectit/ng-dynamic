import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialTextFieldComponentOptions} from './textField.options';

/**
 * Material text field layout metadata loader
 */
export const MaterialTextFieldLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialTextFieldComponentOptions>> = async () => new (await import('./metadata/textField.layoutMetadata')).MaterialTextFieldLayoutEditorMetadata();