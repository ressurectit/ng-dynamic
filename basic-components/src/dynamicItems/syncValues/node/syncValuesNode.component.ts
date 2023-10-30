import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TitledDialogService} from '@anglr/common/material';
import {FormModelBuilder, FormModelGroup, NumberInputModule} from '@anglr/common/forms';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';
import {extend, isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {SyncValuesRelationsOptions} from '../syncValues.options';
import {SyncValuesRelationsOptionsModel} from './syncValuesNode.model';
import {ConfigureSyncPropertySAComponent} from '../misc/components';

/**
 * Sync values node component for negation
 */
@Component(
{
    selector: 'sync-values-node',
    templateUrl: 'syncValuesNode.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        NumberInputModule,
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncValuesNodeSAComponent extends RelationsNodeBase<SyncValuesRelationsOptions> implements RelationsNode<SyncValuesRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form that is being used
     */
    protected form: FormGroup<FormModelGroup<SyncValuesRelationsOptions>>;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {
        super(changeDetector, element);

        this.form = formModelBuilder.build<SyncValuesRelationsOptions>(new SyncValuesRelationsOptionsModel(null));
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
     * Adds new property
     */
    protected async addProperty(): Promise<void>
    {
        await this.configureSyncProperty(this.metadata?.relationsOptions?.syncProperties?.length ?? 0);
        this.changeDetector.detectChanges();
    }

    /**
     * Removes property
     * @param index - Index of property to be removed
     */
    protected removeProperty(index: number): void
    {
        if(!this.metadata?.relationsOptions?.syncProperties)
        {
            return;
        }

        this.metadata.relationsOptions.syncProperties.splice(index, 1);
        this.history.getNewState();
    }

    /**
     * Configures sync property
     * @param index - Index of sync property to be configured
     */
    protected async configureSyncProperty(index: number): Promise<void>
    {
        const result = await lastValueFrom(this.dialog.open<ConfigureSyncPropertySAComponent, string, string|undefined|null>(ConfigureSyncPropertySAComponent,
        {
            title: 'configure sync property',
            width: '60vw',
            data: this.metadata?.relationsOptions?.syncProperties?.[index] ?? ''
        }).afterClosed());

        if(isPresent(result) && this.metadata?.relationsOptions)
        {
            this.metadata.relationsOptions.syncProperties ??= [];
            this.metadata.relationsOptions.syncProperties[index] = result;
            this.history.getNewState();
        }
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