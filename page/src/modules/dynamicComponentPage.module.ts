import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgDynamicCoreModule} from "@anglr/dynamic";

import {DynamicComponentPageComponent} from "../components/dynamicComponentPage/dynamicComponentPage.component";

/**
 * Module containing dynamic component page
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        NgDynamicCoreModule
    ],
    declarations:
    [
        DynamicComponentPageComponent
    ],
    exports:
    [
        DynamicComponentPageComponent
    ]
})
export class DynamicComponentPageModule
{
}