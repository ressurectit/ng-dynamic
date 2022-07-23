import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsComplex.routes';

/**
 * Module for relations complex sample with editor, static components and layout components samples
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
export class RelationsComplexModule
{
}