import {ClassProvider, FactoryProvider, Provider, Type} from '@angular/core';
import {provideRelationsEditor, REFRESH_PALETTE_OBSERVABLES, StaticComponentsRegister, STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER} from '@anglr/dynamic/relations-editor';
import {LayoutComponentsIteratorService, provideLayoutEditor} from '@anglr/dynamic/layout-editor';

import {LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER} from './providers';
import {LayoutComponentsRegister, LayoutManager} from '../services';

/**
 * Providers for relations editor subpackage that works with layout metadata
 */
export function provideLayoutRelationsEditor(): Provider[]
{
    return [
        ...provideLayoutEditor(false),
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

/**
 * Providers for relations editor subpackage, that works with layout metadata, with support of static components
 * @param staticRegister - Type that represents implementation of static components register
 */
export function provideLayoutRelationsEditorWithStatic(staticRegister: Type<StaticComponentsRegister>): Provider[]
{
    return [
        ...provideLayoutRelationsEditor(),
        STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
        STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        <ClassProvider>
        {
            provide: StaticComponentsRegister,
            useClass: staticRegister
        }
    ];
}