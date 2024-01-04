import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsStatic.routes';

/**
 * Module for relations with static components samples
 */
@NgModule()
@ModuleRoutes(components)
export default class RelationsStaticModule
{
}