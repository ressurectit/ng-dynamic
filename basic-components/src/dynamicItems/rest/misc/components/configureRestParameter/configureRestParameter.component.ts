import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {extend} from '@jscrpt/common';

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
                formModelBuilder: FormModelBuilder,)
    {

        this.form = formModelBuilder.build<RestParam>(new RestParamModel(data.parameter));
        this.form.valueChanges.subscribe(value => extend(data.parameter, value));
    }
}