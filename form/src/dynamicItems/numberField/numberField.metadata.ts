import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {NumberFieldComponentOptions} from './numberField.options';

/**
 * Number field layout metadata loader
 */
export const NumberFieldLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<NumberFieldComponentOptions>> = async () => new (await import('./metadata/numberField.layoutMetadata')).NumberFieldLayoutEditorMetadata();

/**
 * Number field relations metadata loader
 */
export const NumberFieldRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/numberField.relationsMetadata')).NumberFieldRelationsEditorMetadata();