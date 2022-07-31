import {ClassProvider, NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {PackageManager} from '@anglr/dynamic';

import {components} from './relationsEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {DemoPackageManager} from '../../services/demoPackageManager/demoPackageManager.service';

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
        createStoreDataServiceFactory('RELATIONS_DATA'),
        provideTinyMceRelationsEditor(),
        provideHandlebarsRelationsEditor(),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoPackageManager,
        },
    ]
})
@ModuleRoutes(components)
export class RelationsEditorModule
{
}