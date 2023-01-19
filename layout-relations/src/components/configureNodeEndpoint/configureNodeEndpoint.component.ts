import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TitledDialogService, TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, getJson, JsonLanguageModel} from '@anglr/dynamic';
import {extend, isPresent} from '@jscrpt/common';
import {lastValueFrom} from 'rxjs';

import {ComponentEndpointDef} from '../../interfaces';
import {ComponentEndpointModel} from './configureNodeEndpoint.model';
import {ConfigureNodeEndpointData} from './configureNodeEndpoint.interface';

/**
 * Component used for configuring node endpoint
 */
@Component(
{
    selector: 'configure-node-endpoint',
    templateUrl: 'configureNodeEndpoint.component.html',
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
        MatDialogModule,
        CommonModule,
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigureNodeEndpointSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form group that is bound to form
     */
    protected form: FormGroup<FormModelGroup<ComponentEndpointDef>>;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: ConfigureNodeEndpointData,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {

        this.form = formModelBuilder.build<ComponentEndpointDef>(new ComponentEndpointModel(data));
        this.form.valueChanges.subscribe(value => extend(data, value));
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        const content = isPresent(this.data.defaultValue) ? JSON.stringify(this.data.defaultValue, null, 4) : '';

        const result = await lastValueFrom(this.dialog.open<CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent|null>(CodeEditorDialogComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data: 
            {
                content,
                languageModel: JsonLanguageModel,

            }
        }).afterClosed());

        if(isPresent(result))
        {
            this.data.defaultValue = getJson(result.content);
        }
    }
}