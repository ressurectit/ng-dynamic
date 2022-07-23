import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModuleRoutes} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {LayoutComponentRendererSADirective, provideLayout} from '@anglr/dynamic/layout';

import {components} from './layout.routes';

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
    ],
    declarations:
    [
        ...components,
    ],
    providers:
    [
        provideLayout(),
    ],
})
@ModuleRoutes(components)
export class LayoutModule
{
}