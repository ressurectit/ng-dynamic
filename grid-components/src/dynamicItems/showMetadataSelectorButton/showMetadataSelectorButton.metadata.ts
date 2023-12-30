import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {ShowMetadataSelectorButtonComponentOptions} from './showMetadataSelectorButton.options';

/**
 * Show metadata selector button layout metadata loader
 */
export const ShowMetadataSelectorButtonLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<ShowMetadataSelectorButtonComponentOptions>> = async () => new (await import('./metadata/showMetadataSelectorButton.layoutMetadata')).ShowMetadataSelectorButtonLayoutEditorMetadata();

/**
 * Show metadata selector button relations metadata loader
 */
export const ShowMetadataSelectorButtonRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/showMetadataSelectorButton.relationsMetadata')).ShowMetadataSelectorButtonRelationsEditorMetadata();
