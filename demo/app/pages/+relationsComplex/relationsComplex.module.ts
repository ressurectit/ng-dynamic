import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {GoBackModule} from '@anglr/common';
import {DynamicLayoutRelationsEditorModule} from '@anglr/dynamic/layout-relations';

import {components} from './relationsComplex.routes';
import {LoadSaveNewSAComponent} from '../../components';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {StaticInputSAComponent, StaticOutputSAComponent} from './misc';

/**
 * Module for relations complex sample with editor, static components and layout components samples
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NgSelectModule,
        GoBackModule,
        DynamicLayoutRelationsEditorModule,
        LoadSaveNewSAComponent,
        StaticInputSAComponent,
        StaticOutputSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_RELATIONS_COMPLEX_DATA'),
    ],
})
@ModuleRoutes(components)
export class RelationsComplexModule
{
}