import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

import {CodeEditorComponent, CodeEditorDialogComponent} from '../components';

/**
 * Module for code editor stuff
 */
@NgModule(
{
    imports:
    [
        MatDialogModule,
        FirstUppercaseLocalizePipe
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