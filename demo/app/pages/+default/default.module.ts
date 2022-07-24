import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModuleRoutes} from '@anglr/common/router';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {ComponentsPaletteSAComponent, ComponentsTreeSAComponent, PropertiesEditorSAComponent} from '@anglr/dynamic/layout-editor';
import {NodesPaletteSAComponent, RelationsCanvasSAComponent, RelationsEditorSAComponent} from '@anglr/dynamic/relations-editor';

import {components} from './default.routes';
import {DebuggingFeatureModule, DisplayingFeatureModule, FormsFeatureModule} from '../../modules';
import {LoadSaveNewSAComponent} from '../../components';

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
        RelationsCanvasSAComponent,
        MatTabsModule,
        LoadSaveNewSAComponent,
        NodesPaletteSAComponent,
        DragDropModule,
        RelationsEditorSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
})
@ModuleRoutes(components)
export class DefaultModule
{
}