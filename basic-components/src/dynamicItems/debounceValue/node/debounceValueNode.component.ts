import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {NumberInputModule} from '@anglr/common/forms';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {isNumber} from '@jscrpt/common';

import {DebounceValueRelationsOptions} from '../debounceValue.options';

/**
 * Debounce value node component for negation
 */
@Component(
{
    selector: 'debounce-value-node',
    templateUrl: 'debounceValueNode.component.html',
    imports:
    [
        ReactiveFormsModule,
        NumberInputModule,
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebounceValueNodeComponent extends RelationsNodeBase<DebounceValueRelationsOptions> implements RelationsNode<DebounceValueRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Form control for handling debounce time
     */
    protected debounceTime: FormControl<number|null> = new FormControl<number>(50);

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override initialize(): void
    {
        this.debounceTime.valueChanges.subscribe(value =>
        {
            if(isNumber(value) && !isNaN(value) && this.metadata?.relationsOptions)
            {
                this.metadata.relationsOptions.delay = value;

                this.history.getNewState();
            }
        });
    }

    /**
     * @inheritdoc
     */
    protected override metadataSet(): void
    {
        if(this.metadata?.relationsOptions?.delay)
        {
            this.debounceTime.patchValue(this.metadata?.relationsOptions.delay);
        }
    }
}