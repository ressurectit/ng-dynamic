import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {DataLoaderComponentOptions} from './dataLoader.options';

/**
 * Data loader layout metadata loader
 */
export const DataLoaderLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<DataLoaderComponentOptions>> = async () => new (await import('./metadata/dataLoader.layoutMetadata')).DataLoaderLayoutEditorMetadata();

/**
 * Data loader layout designer type loader
 */
export const DataLoaderLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/dataLoaderDesigner.component')).DataLoaderDesignerSAComponent;