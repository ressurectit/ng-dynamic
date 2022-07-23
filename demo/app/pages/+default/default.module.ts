import {ClassProvider, NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ModuleRoutes} from '@anglr/common/router';
import {LayoutComponentRendererSADirective, LayoutManager} from '@anglr/dynamic/layout';
import {ComponentsPaletteSAComponent, ComponentsTreeSAComponent, PropertiesEditorSAComponent, provideLayoutEditor} from '@anglr/dynamic/layout-editor';
import {provideRelations, RelationsComponentManager} from '@anglr/dynamic/relations';
import {LayoutComponentsRegister, NodesPaletteSAComponent, provideRelationsEditor, RelationsCanvasSAComponent, RelationsEditorSAComponent, StaticComponentsRegister} from '@anglr/dynamic/relations-editor';

import {components} from './default.routes';
import {DebuggingFeatureModule, DisplayingFeatureModule, FormsFeatureModule} from '../../modules';
import {RelationsResultComponent, RelationsSampleClickComponent} from './misc/components';
import {LoadSaveNewSAComponent} from '../../components';
import {StaticComponentsRegister as DemoRegister} from '../../services/staticComponentsRegister';

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
        RelationsSampleClickComponent,
        RelationsResultComponent,
    ],
    providers:
    [
        ...provideLayoutEditor(),
        ...provideRelations(),
        ...provideRelationsEditor(),
        RelationsComponentManager,
        LayoutComponentsRegister,
        LayoutManager,
        <ClassProvider>
        {
            provide: StaticComponentsRegister,
            useClass: DemoRegister,
        },
    ],
})
@ModuleRoutes(components)
export class DefaultModule
{
}