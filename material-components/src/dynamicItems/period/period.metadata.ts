import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {MaterialPeriodComponentOptions} from './period.options';

/**
 * Material period layout metadata loader
 */
export const MaterialPeriodLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialPeriodComponentOptions>> = async () => new (await import('./metadata/period.layoutMetadata')).MaterialPeriodLayoutEditorMetadata();

/**
 * Material period relations metadata loader
 */
export const MaterialPeriodRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/period.relationsMetadata')).MaterialPeriodRelationsEditorMetadata();