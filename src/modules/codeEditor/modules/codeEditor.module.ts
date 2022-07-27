import {NgModule} from '@angular/core';

import {CodeEditorComponent} from '../components';

/**
 * Module for code editor stuff
 */
@NgModule(
{
    declarations:
    [
        CodeEditorComponent,
    ],
    exports:
    [
        CodeEditorComponent,
    ]
})
export class CodeEditorModule
{
}