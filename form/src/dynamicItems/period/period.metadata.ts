import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {PeriodComponentOptions} from './period.options';

/**
 * Period layout metadata loader
 */
export const PeriodLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PeriodComponentOptions>> = async () => new (await import('./metadata/period.layoutMetadata')).PeriodLayoutEditorMetadata();

/**
 * Period relations metadata loader
 */
export const PeriodRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/period.relationsMetadata')).PeriodRelationsEditorMetadata();