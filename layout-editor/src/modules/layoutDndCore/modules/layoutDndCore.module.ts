import {NgModule} from '@angular/core';

import {DndCoreDesignerDirective, DndCorePaletteItemDirective, DndCorePreviewDirective} from '../directives';

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
    ],
    exports:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewDirective,
    ],
})
export class LayoutDndCoreModule
{
}