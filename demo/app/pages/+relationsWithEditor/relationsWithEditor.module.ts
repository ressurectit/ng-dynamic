import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsWithEditor.routes';

/**
 * Module for relations with editor samples
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
export class RelationsWithEditorModule
{
}