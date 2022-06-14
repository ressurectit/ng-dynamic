import {NgModule} from "@angular/core";

import {NodeDesignerComponent} from "../components/nodeDesigner/nodeDesigner.component";
// import {CommonModule} from "@angular/common";

/**
 * Module for ng dynamic node designer 
 */
@NgModule(
{
    imports:
    [
    ],
    declarations: 
    [
        NodeDesignerComponent,
    ],
    exports:
    [
        NodeDesignerComponent
    ]
})
export class NgDynamicNodeDesignerModule
{
}