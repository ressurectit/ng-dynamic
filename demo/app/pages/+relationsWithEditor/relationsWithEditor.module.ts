import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GoBackSADirective} from '@anglr/common';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsModule} from '@anglr/dynamic/relations';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';

import {components} from './relationsWithEditor.routes';
import {RelationsResultSAComponent, RelationsSampleClickSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for relations with editor samples
 */
@NgModule(
{
    imports:
    [
        RouterModule,
        GoBackSADirective,
        DynamicRelationsModule,
        DynamicRelationsEditorModule,
        RelationsSampleClickSAComponent,
        RelationsResultSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('RELATIONS_TMP'),
    ],
})
@ModuleRoutes(components)
export class RelationsWithEditorModule
{
}