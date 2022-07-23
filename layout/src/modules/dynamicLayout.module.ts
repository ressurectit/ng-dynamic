import {NgModule} from '@angular/core';

import {LayoutComponentRendererSADirective} from '../directives';
import {provideLayout} from '../misc/utils';

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
    providers:
    [
        provideLayout(),
    ]
})
export class DynamicLayoutModule
{
}