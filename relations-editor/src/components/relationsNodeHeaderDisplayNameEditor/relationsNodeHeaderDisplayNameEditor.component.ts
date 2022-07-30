import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';

/**
 * Component used for editing display name of relations node
 */
@Component(
{
    selector: 'relations-node-header-display-name-editor',
    templateUrl: 'relationsNodeHeaderDisplayNameEditor.component.html',
    // styleUrls: ['relationsNodeHeader.component.scss'],
    standalone: true,
    imports:
    [
        MatDialogModule,
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsNodeHeaderDisplayNameEditorSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form control for editation of display name
     */
    protected control: FormControl<string> = new FormControl(inject(TITLED_DIALOG_DATA));
}