import {ComponentRef, ViewContainerRef} from '@angular/core';
import {DynamicItemExtensionType} from '@anglr/dynamic';

import {LayoutComponent, LayoutComponentMetadata} from '../../interfaces';

/**
 * Represents layout renderer item storing info about rendered component and its hierarchy
 */
export interface LayoutRendererItem<TAdditionalData = unknown>
{
    /**
     * Id of renderer
     */
    id: string;

    /**
     * Id of parent renderer
     */
    parentId: string|undefined|null;

    /**
     * Renderers view container
     */
    viewContainer: ViewContainerRef;

    /**
     * Current component metadata for renderer
     */
    metadata: LayoutComponentMetadata;

    /**
     * Current component metadata for renderers parent
     */
    parentMetadata: LayoutComponentMetadata|undefined|null;

    /**
     * Id of scope for current component
     */
    scopeId: string|undefined|null;

    /**
     * Array of child extensions for current component
     */
    childExtensions: DynamicItemExtensionType[]|undefined|null;

    /**
     * Reference to created component
     */
    component: ComponentRef<LayoutComponent>|undefined|null;

    /**
     * Instance of additional data, that can be stored for rendered item
     */
    additionalData: TAdditionalData|undefined|null;
}