import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {BasicPagingComponentOptions} from './basicPaging.options';

/**
 * Basic paging layout metadata loader
 */
export const BasicPagingLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<BasicPagingComponentOptions>> = async () => new (await import('./metadata/basicPaging.layoutMetadata')).BasicPagingLayoutEditorMetadata();

/**
 * Basic paging layout designer type loader
 */
export const BasicPagingLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/basicPagingDesigner.component')).BasicPagingDesignerComponent;