import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {DefaultDynamicPackage} from '@anglr/dynamic';

import {RelationsEditorSAComponent} from '../components';
import {provideRelationsEditor, provideRelationsEditorWithStatic} from '../misc/utils';
import {StaticComponentsRegister} from '../services';

/**
 * Module contains components, directives, pipes for dynamic relations editor rendering
 */
@NgModule(
{
    imports:
    [
        RelationsEditorSAComponent,
    ],
    exports:
    [
        RelationsEditorSAComponent,
    ],
})
export class DynamicRelationsEditorModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicRelationsEditorModule extended with providers
     * @param packages - Array of default packages to be used, if omitted all built-in packages are used
     */
    public static withProviders(packages?: DefaultDynamicPackage[]): ModuleWithProviders<DynamicRelationsEditorModule>
    {
        return {
            ngModule: DynamicRelationsEditorModule,
            providers:
            [
                provideRelationsEditor(packages),
            ]
        };
    }

    /**
     * Creates DynamicRelationsEditorModule extended with providers for static components
     * @param staticRegister - Type that represents implementation of static components register
     * @param packages - Array of default packages to be used, if omitted all built-in packages are used
     */
    public static withStaticComponents(staticRegister: Type<StaticComponentsRegister>, packages?: DefaultDynamicPackage[]): ModuleWithProviders<DynamicRelationsEditorModule>
    {
        return {
            ngModule: DynamicRelationsEditorModule,
            providers:
            [
                provideRelationsEditorWithStatic(staticRegister, packages),
            ]
        };
    }
}