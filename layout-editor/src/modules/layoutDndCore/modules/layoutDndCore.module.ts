import {NgModule} from '@angular/core';

import {DndCoreDesignerDirective} from '../directives';

/**
 * Module used for handling layout dnd core stuff
 */
@NgModule(
{
    declarations:
    [
        DndCoreDesignerDirective,
    ],
    exports:
    [
        DndCoreDesignerDirective,
    ],
})
export class LayoutDndCoreModule
{
}