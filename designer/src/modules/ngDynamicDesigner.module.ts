import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CdkTreeModule} from "@angular/cdk/tree";

import {NgDynamicDesignerModuleCore} from "./ngDynamicDesignerCore.module";
import {NgDynamicNodeDesignerModule} from "./ngDynamicNodeDesigner.module";
import {designerComponentRoutes, designerComponents} from "../components/designer.component.routes";
import {LayoutDesignerComponent} from "../components/layoutDesigner/layoutDesigner.component";
import {LayoutDesignerTreeComponent} from "../components/layoutDesignerTree/layoutDesignerTree.component";
import {ComponentPaletteComponent} from "../components/componentPalette/componentPalette.component";
import {ComponentPaletteItemComponent} from "../components/componentPalette/paletteItem/componentPaletteItem.component";
import {NodeDesignerModeComponent} from "../components/nodeDesignerMode/nodeDesignerMode.component";
import {PropertiesComponent} from "../components/properties/properties.component";
import {PropertyComponent} from "../components/properties/property/property.component";
import {CodeEditorComponent} from "../components/codeEditor/codeEditor.component";
import {NodeComponentPaletteComponent} from "../components/nodeComponentPalette/nodeComponentPalette.component";
import {TogglePanelComponent} from "../components/togglePanel/togglePanel.component";
import {OnlyVisiblePipe} from "../components/properties/misc/pipes/onlyVisible.pipe";
import {CustomPropertyControlDirective} from "../components/properties/misc/directives/customPropertyControl.directive";
import {LeftTopRightBottomNumberComponent} from "../components/properties/misc/components/leftTopRightBottomNumber/leftTopRightBottomNumber.component";

/**
 * Module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        NgDynamicDesignerModuleCore,
        NgDynamicNodeDesignerModule,
        CdkTreeModule,
        RouterModule.forChild(designerComponentRoutes)
    ],
    declarations: 
    [
        designerComponents,
        LayoutDesignerComponent,
        LayoutDesignerTreeComponent,
        ComponentPaletteComponent,
        ComponentPaletteItemComponent,
        NodeDesignerModeComponent,
        PropertiesComponent,
        PropertyComponent,
        CodeEditorComponent,
        NodeComponentPaletteComponent,
        TogglePanelComponent,
        OnlyVisiblePipe,
        CustomPropertyControlDirective,
        LeftTopRightBottomNumberComponent
    ],
    exports:
    [
        NgDynamicDesignerModuleCore
    ]
})
export class NgDynamicDesignerModule
{
}