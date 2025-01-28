import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {PreviousNextPagingComponentOptions} from './previousNextPaging.options';

/**
 * Previou next paging layout metadata loader
 */
export const PreviousNextPagingLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<PreviousNextPagingComponentOptions>> = async () => new (await import('./metadata/previousNextPaging.layoutMetadata')).PreviousNextPagingLayoutEditorMetadata();

/**
 * Previou next paging layout designer type loader
 */
export const PreviousNextPagingLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/previousNextPagingDesigner.component')).PreviousNextPagingDesignerComponent;