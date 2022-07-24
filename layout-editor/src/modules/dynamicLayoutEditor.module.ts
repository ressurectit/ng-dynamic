import {NgModule} from '@angular/core';

import {LayoutEditorSAComponent} from '../components';
import {provideLayoutEditor} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic layout editor rendering
 */
@NgModule(
{
    imports:
    [
        LayoutEditorSAComponent,
    ],
    exports:
    [
        LayoutEditorSAComponent,
    ],
    providers:
    [
        provideLayoutEditor(),
    ]
})
export class DynamicLayoutEditorModule
{
}