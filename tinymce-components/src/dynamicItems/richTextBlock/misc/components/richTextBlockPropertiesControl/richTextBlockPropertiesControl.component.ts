import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TitledDialogService} from '@anglr/common/material';
import {LayoutEditorMetadataExtractor, PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';
import {isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {RichTextBlockEditorDialogSAComponent} from '../richTextBlockEditorDialog/richTextBlockEditorDialog.component';
import {RichTextBlockComponentOptions} from '../../../richTextBlock.options';

/**
 * Component used for displaying rich text block properties control
 */
@Component(
{
    selector: 'rich-text-block-properties-control',
    templateUrl: 'richTextBlockPropertiesControl.component.html',
    standalone: true,
    imports:
    [
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextBlockPropertiesControlSAComponent extends PropertiesControlBase<RichTextBlockComponentOptions> implements PropertiesControl<RichTextBlockComponentOptions>
{
    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                metadataExtractor: LayoutEditorMetadataExtractor,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, metadataExtractor);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        const result = await lastValueFrom(this.dialog.open<RichTextBlockEditorDialogSAComponent, string, string|null>(RichTextBlockEditorDialogSAComponent,
        {
            title: 'Rich text block editor',
            width: '75vw',
            height: '75vh',
            data: this.form?.controls.content.value
        }).afterClosed());

        if(isPresent(result))
        {
            const control = this.form?.controls.content;

            if(control instanceof FormControl)
            {
                control.setValue(result);
            }
        }
    }
}
