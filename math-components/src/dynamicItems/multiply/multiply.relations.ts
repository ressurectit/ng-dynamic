import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {MathMultiplyRelationsMetadataLoader} from './multiply.metadata';
import {MathMultiplyRelationsOptions} from './multiply.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathMultiplyRelationsMetadataLoader)
export class MathMultiplyRelations implements RelationsComponent<MathMultiplyRelationsOptions>
{
    //######################### public proeperties - inputs #########################

    @Input()
    public input1: number|null|undefined;

    @Input()
    public input2: number|null|undefined;

    //######################### public properties - dynamic outputs #########################

    @DynamicOutput()
    public result: number|null|undefined;

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: MathMultiplyRelationsOptions|undefined;

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MathMultiplyRelationsOptions>('input1') in changes ||
           nameof<MathMultiplyRelationsOptions>('input2') in changes)
        {
            if (!this.input1 ||
                !this.input2)
            {
                this.result = 0;
                return;
            }

            this.result = this.input1 * this.input2;
        }
    }

}