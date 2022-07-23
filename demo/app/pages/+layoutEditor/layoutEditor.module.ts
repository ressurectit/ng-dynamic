import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';

import {components} from './layoutEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';

/**
 * Module for layout editor samples
 */
@NgModule(
{
    imports:
    [
        DynamicLayoutEditorModule,
        LoadSaveNewSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
})
@ModuleRoutes(components)
export class LayoutEditorModule
{
}