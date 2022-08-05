import {ClassProvider, FactoryProvider, NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsEditorModule, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {MetadataStorage, PackageManager} from '@anglr/dynamic';

import {components} from './relationsEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {DemoRelationsPackageManager} from '../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';
import {StoreDataService} from '../../services/storeData';

/**
 * Module for relations editor samples
 */
@NgModule(
{
    imports:
    [
        LoadSaveNewSAComponent,
        DynamicRelationsEditorModule.withProviders(),
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        <FactoryProvider>
        {
            provide: RELATIONS_METADATA_STORAGE,
            useFactory: (store: StoreDataService<RelationsNodeMetadata[]>) => new MetadataStorage<RelationsNodeMetadata[]>(id => store.getData(id)),
            deps: [StoreDataService]
        },
        createStoreDataServiceFactory('RELATIONS_DATA'),
        provideTinyMceRelationsEditor(),
        provideHandlebarsRelationsEditor(),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoRelationsPackageManager,
        },
    ]
})
@ModuleRoutes(components)
export class RelationsEditorModule
{
}