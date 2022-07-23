import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsWithLayoutEditor.routes';

/**
 * Module for relations with layout editor samples
 */
@NgModule(
{
    imports:
    [
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
    ],
})
@ModuleRoutes(components)
export class RelationsWithLayoutEditorModule
{
}