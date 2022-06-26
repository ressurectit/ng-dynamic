import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {ModuleRoutes} from '@anglr/common/router';
import {CommonDynamicModule} from '@anglr/common';
import {LayoutComponentRendererSADirective, ComponentStylingSADirective} from '@anglr/dynamic/layout';
import {ComponentsPaletteSAComponent, ComponentsTreeSAComponent, PropertiesControlsModule, PropertiesEditorSAComponent} from '@anglr/dynamic/layout-editor';

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
        ComponentsTreeSAComponent,
        ComponentsPaletteSAComponent,
        PropertiesEditorSAComponent,
        ComponentStylingSADirective,
        MatTabsModule,
        PropertiesControlsModule,
        CommonDynamicModule,
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