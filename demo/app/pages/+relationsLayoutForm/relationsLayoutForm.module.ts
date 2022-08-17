import {FactoryProvider, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {GoBackModule} from '@anglr/common';
import {ModuleRoutes} from '@anglr/common/router';
import {MetadataStorage} from '@anglr/dynamic';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {NgSelectModule} from '@anglr/select';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {DynamicLayoutRelationsEditorModule} from '@anglr/dynamic/layout-relations';

import {components} from './relationsLayoutForm.routes';
import {StoreDataService} from '../../services/storeData';
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
        GoBackModule,
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
        <FactoryProvider>
        {
            provide: LAYOUT_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutComponentMetadata>) => new MetadataStorage<LayoutComponentMetadata>(id => store.getData(id)),
            deps: [StoreDataService]
        },
        createStoreDataServiceFactory('LAYOUT_RELATIONS_FORM_DATA'),
    ],
})
@ModuleRoutes(components)
export class RelationsLayoutFormModule
{
}