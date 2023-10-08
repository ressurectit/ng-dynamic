import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isNumber, isPresent, nameof} from '@jscrpt/common';

import {MathSubtractRelationsMetadataLoader} from './subtract.metadata';
import {MathSubtractRelationsOptions} from './subtract.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathSubtractRelationsMetadataLoader)
export class MathSubtractRelations implements RelationsComponent<MathSubtractRelationsOptions>
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

    relationsOptions: MathSubtractRelationsOptions|undefined;

    //######################### public methods #########################

    public invalidateVisuals(): void
    {
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MathSubtractRelationsOptions>('input1') in changes ||
           nameof<MathSubtractRelationsOptions>('input2') in changes)
        {
            if (isNumber(this.input1) &&
                isNumber(this.input2))
            {
                this.result = this.input1 - this.input2;
                return;
            }

            if (!isPresent(this.input1) &&
                isNumber(this.input2))
            {
                this.result = 0 - this.input2;
                return;
            }

            if (!isPresent(this.input2))
            {
                this.result = this.input1;
                return;
            }

            this.result = null;
        }
    }

}