import {FactoryProvider, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {DynamicLayoutModule, LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {provideCssLayout} from '@anglr/dynamic/css-components';
import {provideTinyMceLayout} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayout} from '@anglr/dynamic/handlebars-components';
import {provideFormLayout} from '@anglr/dynamic/form';
import {MetadataStorage} from '@anglr/dynamic';

import {components} from './layout.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {StoreDataService} from '../../services/storeData';

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
        <FactoryProvider>
        {
            provide: LAYOUT_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutComponentMetadata>) => new MetadataStorage<LayoutComponentMetadata>(id => store.getData(id)),
            deps: [StoreDataService]
        },
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideCssLayout(),
        provideTinyMceLayout(),
        provideHandlebarsLayout(),
        provideFormLayout(),
    ],
})
@ModuleRoutes(components)
export class LayoutModule
{
}