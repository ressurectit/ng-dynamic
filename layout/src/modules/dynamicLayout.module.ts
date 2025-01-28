import {NgModule} from '@angular/core';

import {LayoutComponentRendererDirective} from '../directives';

/**
 * Module contains components, directives, pipes for dynamic layout rendering
 */
@NgModule(
{
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    exports:
    [
        LayoutComponentRendererDirective,
    ]
})
export class DynamicLayoutModule
{
}