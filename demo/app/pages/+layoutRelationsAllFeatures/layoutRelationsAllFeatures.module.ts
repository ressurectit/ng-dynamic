import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';

import {components} from './layoutRelationsAllFeatures.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for relations complex sample with editor, static components and layout components samples
 */
@NgModule(
{
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_RELATIONS_COMPLEX_DATA'),
    ],
})
@ModuleRoutes(components)
export default class LayoutRelationsAllFeaturesModule
{
}