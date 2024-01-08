import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './layoutRelationsForm.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for relations layout form samples
 */
@NgModule(
{
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_RELATIONS_FORM_DATA'),
    ],
})
@ModuleRoutes(components)
export default class LayoutRelationsFormModule
{
}