import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {RelationsEditorMetadataDescriptor} from '@anglr/dynamic/relations-editor';

import {AsyncDataLoaderComponentOptions} from './asyncDataLoader.options';

/**
 * Async data loader layout metadata loader
 */
export const AsyncDataLoaderLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<AsyncDataLoaderComponentOptions>> = async () => new (await import('./metadata/asyncDataLoader.layoutMetadata')).AsyncDataLoaderLayoutEditorMetadata();

/**
 * Async data loader relations metadata loader
 */
export const AsyncDataLoaderRelationsMetadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor> = async () => new (await import('./metadata/asyncDataLoader.relationsMetadata')).AsyncDataLoaderRelationsEditorMetadata();

/**
 * Async data loader layout designer type loader
 */
export const AsyncDataLoaderLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/asyncDataLoaderDesigner.component')).AsyncDataLoaderDesignerComponent;