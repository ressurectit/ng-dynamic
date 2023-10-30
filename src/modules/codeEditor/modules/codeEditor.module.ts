import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';

import {CodeEditorComponent, CodeEditorDialogComponent} from '../components';

/**
 * Module for code editor stuff
 */
@NgModule(
{
    imports:
    [
        MatDialogModule,
        FirstUppercaseLocalizeSAPipe
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