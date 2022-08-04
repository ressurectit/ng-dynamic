import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {FormGroupComponentOptions} from './formGroup.options';

/**
 * Form group layout metadata loader
 */
export const FormGroupLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<FormGroupComponentOptions>> = async () => new (await import('./metadata/formGroup.layoutMetadata')).FormGroupLayoutEditorMetadata();
