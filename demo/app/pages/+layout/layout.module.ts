import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {DynamicLayoutModule, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {provideCssLayout} from '@anglr/dynamic/css-components';
import {provideTinyMceLayout} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayout} from '@anglr/dynamic/handlebars-components';

import {components} from './layout.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for layout preview samples
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        LayoutComponentRendererSADirective,
        DynamicLayoutModule.withProviders(),
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideCssLayout(),
        provideTinyMceLayout(),
        provideHandlebarsLayout(),
    ],
})
@ModuleRoutes(components)
export class LayoutModule
{
}