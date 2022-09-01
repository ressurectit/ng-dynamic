import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import {CodeEditorComponent, CodeEditorDialogComponent} from '../components';

/**
 * Module for code editor stuff
 */
@NgModule(
{
    imports:
    [
        MatDialogModule,
    ],
    declarations:
    [
        CodeEditorComponent,
        CodeEditorDialogComponent,
    ],
    exports:
    [
        CodeEditorComponent,
    ]
})
export class CodeEditorModule
{
}