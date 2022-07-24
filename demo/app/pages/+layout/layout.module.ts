import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {DynamicLayoutModule, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

import {components} from './layout.routes';
import {createStoreDataServiceFactory} from '../../misc/factories';

/**
 * Module for layout preview samples
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        LayoutComponentRendererSADirective,
        DynamicLayoutModule
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_DATA'),
    ],
})
@ModuleRoutes(components)
export class LayoutModule
{
}