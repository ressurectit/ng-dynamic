import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';

import {RelationsNodeProperties, RelationsNodePropertiesEditorData} from './relationsNodePropertiesEditor.interface';
import {RelationsNodePropertiesModel} from './relationsNodePropertiesEditor.model';

/**
 * Component used for editing display name of relations node
 */
@Component(
{
    selector: 'relations-node-properties-editor',
    templateUrl: 'relationsNodePropertiesEditor.component.html',
    // styleUrls: ['relationsNodeHeader.component.scss'],
    standalone: true,
    imports:
    [
        MatDialogModule,
        ReactiveFormsModule,
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsNodePropertiesEditorSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form control for editation of display name
     */
    protected form: FormGroup<FormModelGroup<RelationsNodeProperties>>;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) data: RelationsNodePropertiesEditorData,
                formModelBuilder: FormModelBuilder,)
    {
        this.form = formModelBuilder.build<RelationsNodeProperties>(new RelationsNodePropertiesModel(data.properties));
    }
}