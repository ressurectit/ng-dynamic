import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {FormModelBuilder, FormModelGroup} from '@anglr/common/forms';
import {extend} from '@jscrpt/common/extend';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {ConfigureRestParameterData, ConfigureRestParameterComponent} from '../misc/components';
import {RestRelationsOptions} from '../rest.options';
import {RestParam} from '../misc/interfaces';
import {RestRelationsOptionsModel} from './restNode.model';

/**
 * Relations node component for rest
 */
@Component(
{
    selector: 'rest-node',
    templateUrl: 'restNode.component.html',
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestNodeComponent extends RelationsNodeBase<RestRelationsOptions> implements RelationsNode<RestRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets rest parameters
     */
    protected get params(): RestParam[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??=
        {
            params: [],
            url: null,
            method: null,
            runImmediately: true,
        };

        return (this.metadata.relationsOptions.params ??= []);
    }

    /**
     * Instance of form that is being used
     */
    protected form: FormGroup<FormModelGroup<RestRelationsOptions>>;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {
        super(changeDetector, element);

        this.form = formModelBuilder.build<RestRelationsOptions>(new RestRelationsOptionsModel(null));
        this.form.valueChanges.subscribe(value =>
        {
            if(this.metadata?.relationsOptions)
            {
                extend(this.metadata.relationsOptions, value);
                this.history.getNewState();
            }
        });
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new parameter
     */
    protected async addParam(): Promise<void>
    {
        const param: RestParam =
        {
            configurable: false,
            name: null,
            type: 'PATH',
            value: null,
        };

        if(await this.configureRestParameter(param))
        {
            this.params.push(param);
            this.history.getNewState();
        }
    }

    /**
     * Removes parameter
     * @param param - Param to be removed
     */
    protected removeParam(param: RestParam): void
    {
        const index = this.params.indexOf(param);

        if(index >= 0)
        {
            this.params.splice(index, 1);
            this.history.getNewState();
        }
    }

    /**
     * Configures rest parameter
     * @param param - Parameter to be configured
     */
    protected async configureRestParameter(param: RestParam): Promise<boolean>
    {
        const original = JSON.parse(JSON.stringify(param));

        const result = await lastValueFrom(this.dialog.open<ConfigureRestParameterComponent, ConfigureRestParameterData, true|undefined|null>(ConfigureRestParameterComponent,
        {
            title: 'configure rest parameter',
            width: '60vw',
            data:
            {
                parameter: param,
                hasBody: param.type === 'BODY' ? false : !!this.params.find(itm => itm.type === 'BODY')
            }
        }).afterClosed());

        if(!result)
        {
            extend(param, original);
        }
        else
        {
            this.history.getNewState();
        }

        return result ?? false;
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override metadataSet(): void
    {
        if(!this.metadata?.relationsOptions)
        {
            return;
        }

        this.form.patchValue(this.metadata.relationsOptions);
    }
}