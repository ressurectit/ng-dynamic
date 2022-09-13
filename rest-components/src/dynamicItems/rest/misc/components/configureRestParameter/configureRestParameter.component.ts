import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TitledDialogService, TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, getJson, JsonLanguageModel} from '@anglr/dynamic';
import {extend, isPresent} from '@jscrpt/common';
import {lastValueFrom} from 'rxjs';

import {ConfigureRestParameterData} from './configureRestParameter.interface';
import {RestParam} from '../../interfaces';
import {RestParamModel} from './configureRestParameter.model';

/**
 * Component used for displaying configuration of rest parameters
 */
@Component(
{
    selector: 'configure-rest-parameter',
    templateUrl: 'configureRestParameter.component.html',
    // styleUrls: ['configureRestParameter.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigureRestParameterSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form group that is bound to form
     */
    protected form: FormGroup<FormModelGroup<RestParam>>;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: ConfigureRestParameterData,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {

        this.form = formModelBuilder.build<RestParam>(new RestParamModel(data.parameter));
        this.form.valueChanges.subscribe(value => extend(data.parameter, value));
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        const content = isPresent(this.data.parameter.value) ? JSON.stringify(this.data.parameter.value, null, 4) : '';

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
            this.data.parameter.value = getJson(result.content);
        }
    }
}