import {ClassProvider, NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {PackageManager} from '@anglr/dynamic';
import {provideBasicRelationsEditor} from '@anglr/dynamic/basic-components';
import {provideMaterialRelationsEditor} from '@anglr/dynamic/material-components';
import {provideRestRelationsEditor} from '@anglr/dynamic/rest-components';

import {components} from './relationsEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {DemoRelationsPackageManager} from '../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';

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
        provideBasicRelationsEditor(),
        provideMaterialRelationsEditor(),
        provideTinyMceRelationsEditor(),
        provideHandlebarsRelationsEditor(),
        provideRestRelationsEditor(),
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