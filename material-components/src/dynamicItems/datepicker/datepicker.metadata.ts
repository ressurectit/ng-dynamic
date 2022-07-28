import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialDatepickerComponentOptions} from './datepicker.options';

/**
 * Material datepicker layout metadata loader
 */
export const MaterialDatepickerLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialDatepickerComponentOptions>> = async () => new (await import('./metadata/datepicker.layoutMetadata')).MaterialDatepickerLayoutEditorMetadata();