import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GoBackModule} from '@anglr/common';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsModule} from '@anglr/dynamic/relations';
import {DynamicRelationsEditorModule} from '@anglr/dynamic/relations-editor';

import {components} from './relationsWithEditor.routes';
import {RelationsResultSAComponent, RelationsSampleClickSAComponent} from '../../components';
import {StaticComponentsRegister} from '../../services/staticComponentsRegister';

/**
 * Module for relations with editor samples
 */
@NgModule(
{
    imports:
    [
        RouterModule,
        GoBackModule,
        DynamicRelationsModule,
        DynamicRelationsEditorModule.withStaticComponents(StaticComponentsRegister),
        RelationsSampleClickSAComponent,
        RelationsResultSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
})
@ModuleRoutes(components)
export class RelationsWithEditorModule
{
}