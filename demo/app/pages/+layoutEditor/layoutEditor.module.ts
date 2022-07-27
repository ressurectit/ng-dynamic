import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';
import {CSS_LAYOUT_COMPONENTS_PROVIDER, CSS_LAYOUT_MODULE_TYPES_PROVIDER} from '@anglr/dynamic/css-components';
import {TINY_MCE_LAYOUT_COMPONENTS_PROVIDER, TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER} from '@anglr/dynamic/tinymce-components';

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
        CSS_LAYOUT_COMPONENTS_PROVIDER,
        CSS_LAYOUT_MODULE_TYPES_PROVIDER,
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
        TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER,
    ]
})
@ModuleRoutes(components)
export class LayoutEditorModule
{
}