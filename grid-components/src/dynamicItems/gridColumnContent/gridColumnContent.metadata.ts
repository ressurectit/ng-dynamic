import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridColumnContentComponentOptions} from './gridColumnContent.options';

/**
 * Grid column content layout metadata loader
 */
export const GridColumnContentLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridColumnContentComponentOptions>> = async () => new (await import('./metadata/gridColumnContent.layoutMetadata')).GridColumnContentLayoutEditorMetadata();

/**
 * Grid column content layout designer type loader
 */
export const GridColumnContentLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/gridColumnContentDesigner.component')).GridColumnContentDesignerSAComponent;