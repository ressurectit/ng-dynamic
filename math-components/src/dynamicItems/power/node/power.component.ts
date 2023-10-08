import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {FormModelGroup, FormModelBuilder} from '@anglr/common/forms';
import {TitledDialogService} from '@anglr/common/material';
import {extend} from '@jscrpt/common';

import {MathPowerRelationsOptions} from '../power.options';
import {MathPowerRelationsOptionsModel} from './power.model';

/**
 * Relations node component for math power operation
 */
@Component(
{
    selector: 'math-power-node',
    templateUrl: 'power.component.html',
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
export class MathPowerNodeSAComponent extends RelationsNodeBase<MathPowerRelationsOptions> implements RelationsNode<MathPowerRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Instance of form that is being used
     */
    protected form: FormGroup<FormModelGroup<MathPowerRelationsOptionsModel>>;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,
                formModelBuilder: FormModelBuilder,)
    {
        super(changeDetector, element);

        this.form = formModelBuilder.build<MathPowerRelationsOptionsModel>(new MathPowerRelationsOptionsModel(null));
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