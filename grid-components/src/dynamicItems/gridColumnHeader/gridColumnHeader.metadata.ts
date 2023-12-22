import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {GridColumnHeaderComponentOptions} from './gridColumnHeader.options';

/**
 * Grid column header layout metadata loader
 */
export const GridColumnHeaderLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<GridColumnHeaderComponentOptions>> = async () => new (await import('./metadata/gridColumnHeader.layoutMetadata')).GridColumnHeaderLayoutEditorMetadata();

/**
 * Grid column header layout designer type loader
 */
export const GridColumnHeaderLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/gridColumnHeaderDesigner.component')).GridColumnHeaderDesignerSAComponent;