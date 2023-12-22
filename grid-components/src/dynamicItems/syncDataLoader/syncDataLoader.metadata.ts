import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {SyncDataLoaderComponentOptions} from './syncDataLoader.options';

/**
 * Sync data loader layout metadata loader
 */
export const SyncDataLoaderLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<SyncDataLoaderComponentOptions>> = async () => new (await import('./metadata/syncDataLoader.layoutMetadata')).SyncDataLoaderLayoutEditorMetadata();

/**
 * Sync data loader relations metadata loader
 */
export const SyncDataLoaderRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/syncDataLoader.relationsMetadata')).SyncDataLoaderRelationsEditorMetadata();

/**
 * Sync data loader layout designer type loader
 */
export const SyncDataLoaderLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/syncDataLoaderDesigner.component')).SyncDataLoaderDesignerSAComponent;