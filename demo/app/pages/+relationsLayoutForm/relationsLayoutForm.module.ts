import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {GoBackSADirective} from '@anglr/common';
import {ModuleRoutes} from '@anglr/common/router';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {NgSelectModule} from '@anglr/select';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DynamicLayoutRelationsEditorModule} from '@anglr/dynamic/layout-relations';

import {components} from './relationsLayoutForm.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';
import {LoadSaveNewSAComponent} from '../../components';

/**
 * Module for relations layout form samples
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        LayoutComponentRendererSADirective,
        RouterModule,
        GoBackSADirective,
        DynamicLayoutRelationsEditorModule,
        DebugDataCopyClickModule,
        LoadSaveNewSAComponent,
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_RELATIONS_FORM_DATA'),
    ],
})
@ModuleRoutes(components)
export class RelationsLayoutFormModule
{
}