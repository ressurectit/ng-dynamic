import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from '@anglr/common/router';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {NgSelectModule} from '@anglr/select';
import {GoBackSADirective} from '@anglr/common';
import {DynamicLayoutRelationsEditorModule} from '@anglr/dynamic/layout-relations';
import {ShowRelationsDebuggerSADirective} from '@anglr/dynamic/relations-debugger';

import {components} from './layoutRelationsAllFeatures.routes';
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
        GoBackSADirective,
        DynamicLayoutRelationsEditorModule,
        DebugDataCopyClickModule,
        LoadSaveNewSAComponent,
        StaticInputSAComponent,
        StaticOutputSAComponent,
        ShowRelationsDebuggerSADirective,
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
export default class LayoutRelationsAllFeaturesModule
{
}