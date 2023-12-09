import {ModuleWithProviders, NgModule} from '@angular/core';

import {LayoutComponentRenderer2SADirective, LayoutComponentRendererSADirective} from '../directives';
import {provideLayout} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic layout rendering
 */
@NgModule(
{
    imports:
    [
        LayoutComponentRendererSADirective,
        LayoutComponentRenderer2SADirective,
    ],
    exports:
    [
        LayoutComponentRendererSADirective,
        LayoutComponentRenderer2SADirective,
    ]
})
export class DynamicLayoutModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicLayoutModule extended with providers
     */
    public static withProviders(): ModuleWithProviders<DynamicLayoutModule>
    {
        return {
            ngModule: DynamicLayoutModule,
            providers:
            [
                provideLayout(),
            ]
        };
    }
}