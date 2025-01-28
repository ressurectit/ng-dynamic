import {NgModule} from '@angular/core';

import {CodeEditorComponent, CodeEditorDialogComponent} from '../components';

/**
 * Module for code editor stuff
 */
@NgModule(
{
    imports:
    [
        CodeEditorComponent,
        CodeEditorDialogComponent,
    ],
    exports:
    [
        CodeEditorComponent,
    ],
})
export class CodeEditorModule
{
}