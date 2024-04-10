import {Component, ChangeDetectionStrategy, Inject, ValueProvider} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {globalDefine, isBlank} from '@jscrpt/common';
import {EditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';

declare let ngDynamicTinymcePath: string;

globalDefine(global =>
{
    if(isBlank(global.ngDynamicTinymcePath))
    {
        global.ngDynamicTinymcePath = 'tinymce';
    }
});

/**
 * Component used as dialog displaying rich text block editor
 */
@Component(
{
    selector: 'rich-text-block-editor-dialog',
    templateUrl: 'richTextBlockEditorDialog.component.html',
    standalone: true,
    imports:
    [
        MatDialogModule,
        EditorModule,
    ],
    providers: 
    [
        <ValueProvider>
        {
            provide: TINYMCE_SCRIPT_SRC,
            useValue: ngDynamicTinymcePath + '/tinymce.min.js'
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextBlockEditorDialogSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Base url for obtaining tiny mce script
     */
    protected baseUrl: string = ngDynamicTinymcePath;

    /**
     * Current content of editor
     */
    protected content: string|null = null;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: string,
                protected dialog: MatDialogRef<RichTextBlockEditorDialogSAComponent, string|null>,)
    {
        this.content = data;
    }
}