import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {PagingComponentOptions} from './paging.options';

/**
 * Paging layout metadata loader
 */
export const PagingLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PagingComponentOptions>> = async () => new (await import('./metadata/paging.layoutMetadata')).PagingLayoutEditorMetadata();

/**
 * Paging layout designer type loader
 */
export const PagingLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/pagingDesigner.component')).PagingDesignerSAComponent;