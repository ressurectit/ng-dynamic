import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsLayoutForm.routes';

/**
 * Module for relations layout form samples
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
export class RelationsLayoutFormModule
{
}