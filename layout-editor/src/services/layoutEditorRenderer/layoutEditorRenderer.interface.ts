import {ComponentRef, ViewContainerRef} from '@angular/core';
import {LayoutComponent, LayoutRendererItem} from '@anglr/dynamic/layout';

/**
 * Represents layout renderer item storing info about rendered component and its hierarchy
 */
export interface LayoutEditorRendererItem extends LayoutRendererItem
{
    /**
     * Reference to created layout designer component
     */
    layoutDesigner: ComponentRef<LayoutComponent>|undefined|null;

    /**
     * View container for component
     */
    componentViewContainer: ViewContainerRef|undefined|null;

    /**
     * Id of rederer used for rendering component
     */
    componentRendererId: string|undefined|null;
}