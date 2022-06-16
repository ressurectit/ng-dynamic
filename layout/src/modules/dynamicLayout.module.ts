import {NgModule} from '@angular/core';

import {LayoutComponentRendererSADirective} from '../directives';

/**
 * Module contains components, directives, pipes for dynamic layout rendering
 */
@NgModule(
{
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    exports:
    [
        LayoutComponentRendererSADirective,
    ],
})
export class DynamicLayoutModule
{
}