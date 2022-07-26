import {NgModule} from '@angular/core';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';

import {components} from './relationsEditor.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';

//TODO: remove LAYOUT_HISTORY_MANAGER_PROVIDER, LAYOUT_HISTORY_MANAGER_GET_STATE, providers when state management for relatiosn will be working
//TODO: find out why relations editor requires things for layout editor

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
    ]
})
@ModuleRoutes(components)
export class RelationsEditorModule
{
}