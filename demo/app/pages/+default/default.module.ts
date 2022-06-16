import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {LayoutComponentRendererSADirective, ComponentStylingSADirective} from '@anglr/dynamic/layout';

import {components} from './default.routes';
import {DebuggingFeatureModule, DisplayingFeatureModule, FormsFeatureModule} from '../../modules';

/**
 * Module for Default application pages
 */
@NgModule(
{
    imports:
    [
        DisplayingFeatureModule,
        FormsFeatureModule,
        DebuggingFeatureModule,
        LayoutComponentRendererSADirective,
        ComponentStylingSADirective,
    ],
    declarations:
    [
        ...components
    ]
})
@ModuleRoutes(components)
export class DefaultModule
{
}