import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';
import {DynamicRelationsEditorModule, StaticComponentsRegister} from '@anglr/dynamic/relations-editor';
import {DefaultDynamicPackage} from '@anglr/dynamic';

import {provideLayoutRelationsEditor, provideLayoutRelationsEditorWithStatic} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic layout relations editor rendering
 */
@NgModule(
{
    exports:
    [
        DynamicLayoutEditorModule,
        DynamicRelationsEditorModule,
    ]
})
export class DynamicLayoutRelationsEditorModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicLayoutRelationsEditorModule extended with providers
     * @param packages - Array of default packages to be used, if omitted all built-in packages are used
     */
    public static withProviders(packages: DefaultDynamicPackage[] = ['basic-components', 'material-components']): ModuleWithProviders<DynamicLayoutRelationsEditorModule>
    {
        return {
            ngModule: DynamicLayoutRelationsEditorModule,
            providers:
            [
                provideLayoutRelationsEditor(packages),
            ]
        };
    }

    /**
     * Creates DynamicLayoutRelationsEditorModule extended with providers for static components
     * @param staticRegister - Type that represents implementation of static components register
     * @param packages - Array of default packages to be used, if omitted all built-in packages are used
     */
    public static withStaticComponents(staticRegister: Type<StaticComponentsRegister>,
                                       packages: DefaultDynamicPackage[] = ['basic-components', 'material-components']): ModuleWithProviders<DynamicLayoutRelationsEditorModule>
    {
        return {
            ngModule: DynamicLayoutRelationsEditorModule,
            providers:
            [
                provideLayoutRelationsEditorWithStatic(staticRegister, packages),
            ]
        };
    }
}