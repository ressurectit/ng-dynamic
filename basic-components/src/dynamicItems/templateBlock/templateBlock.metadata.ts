import {Type} from '@angular/core';
import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {TemplateBlockComponentOptions} from './templateBlock.options';

/**
 * Template block layout metadata loader
 */
export const TemplateBlockLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<TemplateBlockComponentOptions>> = async () => new (await import('./metadata/templateBlock.layoutMetadata')).TemplateBlockLayoutEditorMetadata();

/**
 * Template block layout designer type loader
 */
export const TemplateBlockLayoutDesignerTypeLoader: DynamicMetadataLoader<Type<LayoutComponent>> = async () => (await import('./designer/templateBlockDesigner.component')).TemplateBlockDesignerSAComponent;