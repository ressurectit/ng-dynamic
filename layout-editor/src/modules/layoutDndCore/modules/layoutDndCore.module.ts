import {NgModule} from '@angular/core';

import {DndCoreDesignerDirective, DndCorePaletteItemDirective} from '../directives';

/**
 * Module used for handling layout dnd core stuff
 */
@NgModule(
{
    declarations:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
    ],
    exports:
    [
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
    ],
})
export class LayoutDndCoreModule
{
}