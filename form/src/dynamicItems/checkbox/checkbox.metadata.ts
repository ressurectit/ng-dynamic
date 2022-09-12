import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {CheckboxComponentOptions} from './checkbox.options';

/**
 * Checkbox layout metadata loader
 */
export const CheckboxLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<CheckboxComponentOptions>> = async () => new (await import('./metadata/checkbox.layoutMetadata')).CheckboxLayoutEditorMetadata();

/**
 * Checkbox relations metadata loader
 */
export const CheckboxRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/checkbox.relationsMetadata')).CheckboxRelationsEditorMetadata();