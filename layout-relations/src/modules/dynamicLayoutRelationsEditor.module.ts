import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {DynamicLayoutEditorModule, provideLayoutEditor} from '@anglr/dynamic/layout-editor';
import {provideRelations} from '@anglr/dynamic/relations';
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
                provideRelations(),
                provideLayoutRelationsEditor(),
                provideLayoutEditor(),
            ]
        };
    }

    /**
     * Creates DynamicLayoutRelationsEditorModule extended with providers for static components
     * @param staticRegister - Type that represents implementation of static components register
     */
    public static withStaticComponents(staticRegister: Type<StaticComponentsRegister>): ModuleWithProviders<DynamicRelationsEditorModule>
    {
        return {
            ngModule: DynamicLayoutRelationsEditorModule,
            providers:
            [
                provideRelations(),
                provideLayoutRelationsEditorWithStatic(staticRegister),
                provideLayoutEditor(),
            ]
        };
    }
}