import {ClassProvider, FactoryProvider, Provider, Type} from '@angular/core';
import {provideLayout} from '@anglr/dynamic/layout';
import {provideRelations} from '@anglr/dynamic/relations';
import {provideRelationsEditor, REFRESH_PALETTE_OBSERVABLES, StaticComponentsRegister, STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER} from '@anglr/dynamic/relations-editor';
import {LayoutComponentsIteratorService, provideLayoutEditor} from '@anglr/dynamic/layout-editor';
import {DefaultDynamicPackage, provideStaticPackageSource} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER, RELATIONS_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, RELATIONS_COMPONENTS_RELATIONS_NODES_PROVIDER} from './providers';
import {LayoutComponentsRegister, LayoutManager, RelationsComponentsRegister} from '../services';

/**
 * Providers for relations subpackage that works with layout metadata
 */
export function provideLayoutRelations(): Provider[]
{
    return [
        ...provideLayout(),
        ...provideRelations(),
    ];
}

/**
 * Providers for relations editor subpackage that works with layout metadata
 * @param packages - Array of default packages to be used, if omitted all built-in packages are used
 */
export function provideLayoutRelationsEditor(packages?: DefaultDynamicPackage[]): Provider[]
{
    return [
        ...provideLayoutEditor(false, packages),
        ...provideRelationsEditor([]),
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
        },
        provideStaticPackageSource('layout-components'),
    ];
}

/**
 * Providers that enables use of relations components
 * @param relationsComponentRegister - Type that represents implementation of relations components register
 */
export function provideRelationsComponents(relationsComponentRegister: Type<RelationsComponentsRegister> = RelationsComponentsRegister): Provider[]
{
    return [
        RELATIONS_COMPONENTS_RELATIONS_NODES_PROVIDER,
        RELATIONS_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('relations-components'),
        <ClassProvider>
        {
            provide: RelationsComponentsRegister,
            useClass: relationsComponentRegister,
        }
    ];
}

/**
 * Providers for relations editor subpackage, that works with layout metadata, with support of static components
 * @param staticRegister - Type that represents implementation of static components register
 * @param packages - Array of default packages to be used, if omitted all built-in packages are used
 */
export function provideLayoutRelationsEditorWithStatic(staticRegister: Type<StaticComponentsRegister>, packages?: DefaultDynamicPackage[]): Provider[]
{
    return [
        ...provideLayoutRelationsEditor(packages),
        STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER,
        STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        <ClassProvider>
        {
            provide: StaticComponentsRegister,
            useClass: staticRegister
        },
        provideStaticPackageSource('static-components'),
    ];
}