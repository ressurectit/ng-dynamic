import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './layoutRelationsEditor.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for relations with layout editor samples
 */
@NgModule(
{
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_RELATIONS_DATA'),
    ],
})
@ModuleRoutes(components)
export default class LayoutRelationsEditorModule
{
}