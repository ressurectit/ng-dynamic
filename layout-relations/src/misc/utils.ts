import {ClassProvider, FactoryProvider, Provider, Type} from '@angular/core';
import {provideLayout} from '@anglr/dynamic/layout';
import {provideRelations} from '@anglr/dynamic/relations';
import {provideRelationsEditor, REFRESH_PALETTE_OBSERVABLES, ScopeRegister as RelationsScopeRegister, StaticComponentsRegister, STATIC_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, STATIC_COMPONENTS_RELATIONS_NODES_PROVIDER} from '@anglr/dynamic/relations-editor';
import {LayoutComponentsIteratorService, provideLayoutEditor} from '@anglr/dynamic/layout-editor';
import {provideStaticPackageSource} from '@anglr/dynamic';

import {LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER, CUSTOM_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER, CUSTOM_COMPONENTS_RELATIONS_NODES_PROVIDER, CUSTOM_COMPONENTS_LAYOUT_MODULE_TYPES_PROVIDER, CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER} from './providers';
import {LayoutComponentsRegister, LayoutManager, CustomComponentsRegister, ScopeRegister} from '../services';

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
 * Providers for relations subpackage that works with layout metadata
 */
export function provideLayoutRelationsCustomComponents(): Provider[]
{
    return [
        ...provideLayoutRelations(),
        CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER,
    ];
}

/**
 * Providers for relations editor subpackage that works with layout metadata
 */
export function provideLayoutRelationsEditor(): Provider[]
{
    const relationsProviders = provideRelationsEditor();
    relationsProviders.splice(relationsProviders.indexOf(RelationsScopeRegister), 1);

    return [
        ...provideLayoutEditor(false),
        ...relationsProviders,
        LAYOUT_COMPONENTS_RELATIONS_NODES_PROVIDER,
        LAYOUT_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        LayoutManager,
        LayoutComponentsRegister,
        LayoutComponentsIteratorService,
        <ClassProvider>
        {
            provide: RelationsScopeRegister,
            useClass: ScopeRegister,
        },
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
 * Providers that enables use of custom relations components in relations editor
 * @param layoutRelationsEditorProviders - Array of providers for layout relations editor
 * @param customComponentRegister - Type that represents implementation of custom components register
 */
export function provideEditorRelationsCustomComponents(layoutRelationsEditorProviders: Provider[],
                                                       customComponentRegister: Type<CustomComponentsRegister> = CustomComponentsRegister,): Provider[]
{
    return [
        CUSTOM_COMPONENTS_RELATIONS_NODES_PROVIDER,
        CUSTOM_COMPONENTS_RELATIONS_MODULE_TYPES_PROVIDER,
        CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER,
        provideStaticPackageSource('custom-components'),
        <ClassProvider>
        {
            provide: CustomComponentsRegister,
            useClass: customComponentRegister,
        },
        ...layoutRelationsEditorProviders,
    ];
}

/**
 * Providers that enables use of custom layout components in layout editor
 * @param layoutRelationsEditorProviders - Array of providers for layout relations editor
 * @param customComponentRegister - Type that represents implementation of custom components register
 */
export function provideEditorLayoutCustomComponents(layoutRelationsEditorProviders: Provider[],
                                                    customComponentRegister: Type<CustomComponentsRegister> = CustomComponentsRegister,): Provider[]
{
    //TODO: maybe remove first parameter

    return [
        CUSTOM_COMPONENTS_LAYOUT_COMPONENTS_PROVIDER,
        CUSTOM_COMPONENTS_LAYOUT_MODULE_TYPES_PROVIDER,
        provideStaticPackageSource('custom-components'),
        <ClassProvider>
        {
            provide: CustomComponentsRegister,
            useClass: customComponentRegister,
        },
        ...layoutRelationsEditorProviders,
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
        },
        provideStaticPackageSource('static-components'),
    ];
}