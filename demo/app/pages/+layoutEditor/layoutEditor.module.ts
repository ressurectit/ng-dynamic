import {ClassProvider, ExistingProvider, FactoryProvider, NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicLayoutEditorModule} from '@anglr/dynamic/layout-editor';
import {provideCssLayoutEditor} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutEditor} from '@anglr/dynamic/handlebars-components';
import {LayoutComponentMetadata, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {MetadataStorage, PackageManager} from '@anglr/dynamic';

import {components} from './layoutEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {DemoLayoutPackageManager} from '../../services/demoLayoutPackageManager/demoLayoutPackageManager.service';
import {StoreDataService} from '../../services/storeData';
import {provideFormLayoutEditor} from '../../../../form/src';

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
        <FactoryProvider>
        {
            provide: LAYOUT_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutComponentMetadata>) => new MetadataStorage<LayoutComponentMetadata>(id => store.getData(id)),
            deps: [StoreDataService]
        },
        <ExistingProvider>
        {
            provide: MetadataStorage,
            useExisting: LAYOUT_METADATA_STORAGE,
        },
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideCssLayoutEditor(),
        provideTinyMceLayoutEditor(),
        provideHandlebarsLayoutEditor(),
        provideFormLayoutEditor(),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoLayoutPackageManager,
        },
    ]
})
@ModuleRoutes(components)
export class LayoutEditorModule
{
}