import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';
import {DynamicRelationsEditorModule, StaticComponentsRegister} from '@anglr/dynamic/relations-editor';

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
     */
    public static withProviders(): ModuleWithProviders<DynamicLayoutRelationsEditorModule>
    {
        return {
            ngModule: DynamicLayoutRelationsEditorModule,
            providers:
            [
                provideLayoutRelationsEditor(),
            ]
        };
    }

    /**
     * Creates DynamicLayoutRelationsEditorModule extended with providers for static components
     * @param staticRegister - Type that represents implementation of static components register
     */
    public static withStaticComponents(staticRegister: Type<StaticComponentsRegister>): ModuleWithProviders<DynamicLayoutRelationsEditorModule>
    {
        return {
            ngModule: DynamicLayoutRelationsEditorModule,
            providers:
            [
                provideLayoutRelationsEditorWithStatic(staticRegister, ),
            ]
        };
    }
}