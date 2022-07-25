import {FactoryProvider, Provider} from '@angular/core';
import {provideRelationsEditor, REFRESH_PALETTE_OBSERVABLES} from '@anglr/dynamic/relations-editor';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';

import {LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER} from './providers';
import {LayoutComponentsRegister, LayoutManager} from '../services';

/**
 * Providers for relations editor subpackage that works with layout metadata
 */
export function provideLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideRelationsEditor(),
        LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER,
        LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        LayoutManager,
        LayoutComponentsRegister,
        LayoutComponentsIteratorService,
        <FactoryProvider>
        {
            provide: REFRESH_PALETTE_OBSERVABLES,
            useFactory: (layoutManager: LayoutManager) =>
            {
                return layoutManager.layoutChange;
            },
            deps: [LayoutManager],
            multi: true
        }
    ];
}