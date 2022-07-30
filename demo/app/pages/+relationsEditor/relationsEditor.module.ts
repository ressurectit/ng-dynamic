import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';

import {components} from './relationsEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';

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
    ]
})
@ModuleRoutes(components)
export class RelationsEditorModule
{
}