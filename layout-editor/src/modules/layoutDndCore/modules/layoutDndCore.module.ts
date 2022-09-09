import {NgModule} from '@angular/core';

import {DndCoreDesignerDirective, DndCorePaletteItemDirective, DndCorePreviewDirective, DndCoreTreeItemDirective} from '../directives';

/**
 * Module used for handling layout dnd core stuff
 */
@NgModule(
{
    declarations:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewDirective,
        DndCoreTreeItemDirective,
    ],
    exports:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewDirective,
        DndCoreTreeItemDirective,
    ],
})
export class LayoutDndCoreModule
{
}