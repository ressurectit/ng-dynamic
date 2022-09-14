import {NgModule} from '@angular/core';

import {DndCoreDesignerDirective, DndCorePaletteItemDirective, DndCorePreviewTemplateDirective, DndCoreTreeItemDirective} from '../directives';

/**
 * Module used for handling layout dnd core stuff
 */
@NgModule(
{
    declarations:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewTemplateDirective,
        DndCoreTreeItemDirective,
    ],
    exports:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewTemplateDirective,
        DndCoreTreeItemDirective,
    ],
})
export class LayoutDndCoreModule
{
}