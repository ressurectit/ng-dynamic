import {Provider} from '@angular/core';
import {provideRelationsEditor} from '@anglr/dynamic/relations-editor';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';

import {LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Providers for relations editor subpackage that works with layout metadata
 */
export function provideLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideRelationsEditor(),
        LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER,
        LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        LayoutComponentsIteratorService,
    ];
}