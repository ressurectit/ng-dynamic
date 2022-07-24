import {NgModule} from '@angular/core';

import {RelationsEditorSAComponent} from '../components';
import {provideRelationsEditor} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic relations editor rendering
 */
@NgModule(
{
    imports:
    [
        RelationsEditorSAComponent,
    ],
    exports:
    [
        RelationsEditorSAComponent,
    ],
    providers:
    [
        provideRelationsEditor(),
    ]
})
export class DynamicRelationsEditorModule
{
}