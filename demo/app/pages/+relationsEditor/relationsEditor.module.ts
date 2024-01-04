import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './relationsEditor.routes';

/**
 * Module for relations editor samples
 */
@NgModule()
@ModuleRoutes(components)
export default class RelationsEditorModule
{
}