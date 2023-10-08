import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {FormModelGroup, FormModelBuilder} from '@anglr/common/forms';
import {TitledDialogService} from '@anglr/common/material';
import {extend} from '@jscrpt/common';

import {MathRoundRelationsOptions} from '../round.options';
import {MathRoundRelationsOptionsModel} from './round.model';

/**
 * Relations node component for round operation
 */
@Component(
{
    selector: 'math-round-node',
    templateUrl: 'round.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers:
    [
        FormModelBuilder
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathRoundNodeSAComponent extends RelationsNodeBase<MathRoundRelationsOptions> implements RelationsNode<MathRoundRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form that is being used
     */
    protected form: FormGroup<FormModelGroup<MathRoundRelationsOptionsModel>>;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {
        super(changeDetector, element);

        this.form = formModelBuilder.build<MathRoundRelationsOptionsModel>(new MathRoundRelationsOptionsModel(null));
        this.form.valueChanges.subscribe(value =>
        {
            if(this.metadata?.relationsOptions)
            {
                extend(this.metadata.relationsOptions, value);

                this.history.getNewState();
            }
        });
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