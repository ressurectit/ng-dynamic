import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {CodeEditorModule} from '@anglr/dynamic';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';

import {CodeEditorDialogData} from './codeEditorDialog.interface';

/**
 * Component used as dialog displaying code editor
 */
@Component(
{
    selector: 'code-editor-dialog',
    templateUrl: 'codeEditorDialog.component.html',
    // styleUrls: ['codeEditorDialog.component.scss'],
    standalone: true,
    imports:
    [
        CodeEditorModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorDialogSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Current content of code editor
     */
    protected content: string|null = null;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: CodeEditorDialogData,)
    {
        this.content = data.content;
    }
}