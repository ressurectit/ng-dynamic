import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';

import {CodeEditorDialogData} from './codeEditorDialog.interface';

/**
 * Component used as dialog displaying code editor
 */
@Component(
{
    selector: 'code-editor-dialog',
    templateUrl: 'codeEditorDialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorDialogComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Current content of code editor
     */
    protected content: string|null = null;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: CodeEditorDialogData,
                protected dialog: MatDialogRef<CodeEditorDialogComponent, string|null>,)
    {
        this.content = data.content;
    }
}