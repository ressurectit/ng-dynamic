import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {EditorModule} from '@tinymce/tinymce-angular';

/**
 * Component used as dialog displaying rich text block editor
 */
@Component(
{
    selector: 'rich-text-block-editor-dialog',
    templateUrl: 'richTextBlockEditorDialog.component.html',
    // styleUrls: ['codeEditorDialog.component.scss'],
    standalone: true,
    imports:
    [
        MatDialogModule,
        EditorModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextBlockEditorDialogSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Current content of editor
     */
    protected content: string|null = null;

    //######################### protected properties - children #########################


    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: string,
                protected dialog: MatDialogRef<RichTextBlockEditorDialogSAComponent, string|null>,)
    {
        this.content = data;
    }
}