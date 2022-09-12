import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {DatepickerComponentOptions} from './datepicker.options';

/**
 * Datepicker layout metadata loader
 */
export const DatepickerLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DatepickerComponentOptions>> = async () => new (await import('./metadata/datepicker.layoutMetadata')).DatepickerLayoutEditorMetadata();

/**
 * Datepicker relations metadata loader
 */
export const DatepickerRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/datepicker.relationsMetadata')).DatepickerRelationsEditorMetadata();