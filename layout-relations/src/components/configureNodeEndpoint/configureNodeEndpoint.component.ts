import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {extend} from '@jscrpt/common';

import {ComponentEndpointDef} from '../../interfaces';
import {ComponentEndpointModel} from './configureNodeEndpoint.model';

/**
 * Component used for configuring node endpoint
 */
@Component(
{
    selector: 'configure-node-endpoint',
    templateUrl: 'configureNodeEndpoint.component.html',
    // styleUrls: ['configureNodeEndpoint.component.css'],
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
        MatDialogModule,
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

    protected form: FormGroup<FormModelGroup<ComponentEndpointDef>>;

    //######################### constructor #########################
    constructor(@Inject(TITLED_DIALOG_DATA) protected data: ComponentEndpointDef,
                formModelBuilder: FormModelBuilder,)
    {

        this.form = formModelBuilder.build<ComponentEndpointDef>(new ComponentEndpointModel(data));
        this.form.valueChanges.subscribe(value => extend(data, value));
    }
}