import {FactoryProvider, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {DynamicLayoutModule, LayoutComponentMetadata, LAYOUT_METADATA_STORAGE, provideLayout, withLayoutRuntime} from '@anglr/dynamic/layout';
import {provideBasicLayout, withBasicComponents} from '@anglr/dynamic/basic-components';
import {provideMaterialLayout} from '@anglr/dynamic/material-components';
import {provideCssLayout} from '@anglr/dynamic/css-components';
import {provideTinyMceLayout} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayout} from '@anglr/dynamic/handlebars-components';
import {provideFormLayout} from '@anglr/dynamic/form';
import {MetadataStorage, provideDynamic} from '@anglr/dynamic';

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
        DynamicLayoutModule,
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
        provideDynamic([withLayoutRuntime()],
                       withBasicComponents()),

                       
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideLayout(),
        provideBasicLayout(),
        provideMaterialLayout(),
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