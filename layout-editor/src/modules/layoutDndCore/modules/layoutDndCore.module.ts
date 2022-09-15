import {NgModule} from '@angular/core';

import {DndCorePreviewComponent} from '../components';
import {DndCoreDesignerDirective, DndCorePaletteItemDirective, DndCorePreviewTemplateDirective, DndCoreTreeItemDirective} from '../directives';

/**
 * Module used for handling layout dnd core stuff
 */
@NgModule(
{
    declarations:
    [
        DndCorePreviewComponent,
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewTemplateDirective,
        DndCoreTreeItemDirective,
    ],
    exports:
    [
        DndCorePreviewComponent,
        DndCoreDesignerDirective,
        DndCorePaletteItemDirective,
        DndCorePreviewTemplateDirective,
        DndCoreTreeItemDirective,
    ],
})
export class LayoutDndCoreModule
{
}