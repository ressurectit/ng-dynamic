import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from '@anglr/common/router';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {ComponentsPaletteSAComponent, ComponentsTreeSAComponent, PropertiesEditorSAComponent, provideLayoutEditor} from '@anglr/dynamic/layout-editor';

import {components} from './layoutEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';

/**
 * Module for layout editor samples
 */
@NgModule(
{
    imports:
    [
        RouterModule,
        MatTabsModule,
        PropertiesEditorSAComponent,
        ComponentsTreeSAComponent,
        ComponentsPaletteSAComponent,
        LayoutComponentRendererSADirective,
        LoadSaveNewSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        provideLayoutEditor(),
    ],
})
@ModuleRoutes(components)
export class LayoutEditorModule
{
}