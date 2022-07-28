import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {DynamicLayoutModule, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {CSS_LAYOUT_COMPONENTS_PROVIDER} from '@anglr/dynamic/css-components';
import {TINY_MCE_LAYOUT_COMPONENTS_PROVIDER} from '@anglr/dynamic/tinymce-components';
import {HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER} from '@anglr/dynamic/handlebars-components';

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
        CSS_LAYOUT_COMPONENTS_PROVIDER,
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
        HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
    ],
})
@ModuleRoutes(components)
export class LayoutModule
{
}