import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';

import {CodeEditorDialogData} from './codeEditorDialog.interface';
import {CodeEditorContent} from '../codeEditor/codeEditor.interface';
import {CodeEditorComponent} from '../codeEditor/codeEditor.component';

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
    protected editorContent: CodeEditorContent|null = null;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: CodeEditorDialogData,
                protected dialog: MatDialogRef<CodeEditorDialogComponent, CodeEditorContent|null>,)
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Saves content of code editor and closes dialog
     * @param editor - Instance of code editor
     */
    protected async saveAndClose(editor: CodeEditorComponent): Promise<void>
    {
        await editor.saveContent();
        this.dialog.close(this.editorContent);
    }
}