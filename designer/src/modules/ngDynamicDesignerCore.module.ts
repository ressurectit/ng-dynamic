import {NgModule} from "@angular/core";

import {DesignerComponentRendererDirective} from "../directives/designerComponentRenderer/designerComponentRenderer.directive";
import {DroppableDirective} from "../directives/droppable/droppable.directive";
import {DesignerComponentHeaderComponent} from "../components/designerComponentHeader/designerComponentHeader.component";
import {DropAreaComponent} from "../components/drop/dropArea.component";


/**
 * Core module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
    ],
    declarations: 
    [
        DesignerComponentRendererDirective,
        DroppableDirective,
        DesignerComponentHeaderComponent,
        DropAreaComponent
    ],
    exports:
    [
        DesignerComponentRendererDirective,
        DroppableDirective,
        DesignerComponentHeaderComponent,
        DropAreaComponent
    ]
})
export class NgDynamicDesignerModuleCore
{
}