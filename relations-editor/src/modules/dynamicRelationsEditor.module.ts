import {ModuleWithProviders, NgModule, Type} from '@angular/core';

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
    providers:
    [
        provideRelationsEditor(),
    ]
})
export class DynamicRelationsEditorModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicRelationsEditorModule extended with providers for static components
     * @param staticRegister - Type that represents implementation of static components register
     */
    public static withStaticComponents(staticRegister: Type<StaticComponentsRegister>): ModuleWithProviders<DynamicRelationsEditorModule>
    {
        return {
            ngModule: DynamicRelationsEditorModule,
            providers:
            [
                provideRelationsEditorWithStatic(staticRegister),
            ]
        };
    }
}