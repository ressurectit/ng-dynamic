import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicLayoutRelationsEditorModule} from '@anglr/dynamic/layout-relations';

import {components} from './relationsWithLayoutEditor.routes';

/**
 * Module for relations with layout editor samples
 */
@NgModule(
{
    imports:
    [
        DynamicLayoutRelationsEditorModule.withProviders(),
    ],
    declarations:
    [
        ...components,
    ],
})
@ModuleRoutes(components)
export class RelationsWithLayoutEditorModule
{
}