import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';
import {provideCssLayoutEditor} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutEditor} from '@anglr/dynamic/handlebars-components';

import {components} from './layoutEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for layout editor samples
 */
@NgModule(
{
    imports:
    [
        DynamicLayoutEditorModule.withProviders(),
        LoadSaveNewSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideCssLayoutEditor(),
        provideTinyMceLayoutEditor(),
        provideHandlebarsLayoutEditor(),
    ]
})
@ModuleRoutes(components)
export class LayoutEditorModule
{
}