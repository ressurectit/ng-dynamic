import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialDatepickerComponentOptions} from './datepicker.options';

/**
 * Material datepicker layout metadata loader
 */
export const MaterialDatepickerLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialDatepickerComponentOptions>> = async () => new (await import('./metadata/datepicker.layoutMetadata')).MaterialDatepickerLayoutEditorMetadata();

/**
 * Material datepicker relations metadata loader
 */
export const MaterialDatepickerRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/datepicker.relationsMetadata')).MaterialDatepickerRelationsEditorMetadata();