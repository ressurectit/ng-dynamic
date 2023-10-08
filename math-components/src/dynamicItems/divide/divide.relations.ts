import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isNumber, isPresent, nameof} from '@jscrpt/common';

import {MathDivideRelationsMetadataLoader} from './divide.metadata';
import {MathDivideRelationsOptions} from './divide.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathDivideRelationsMetadataLoader)
export class MathDivideRelations implements RelationsComponent<MathDivideRelationsOptions>
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

    relationsOptions: MathDivideRelationsOptions|undefined;

    //######################### public methods #########################

    public invalidateVisuals(): void
    {
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MathDivideRelationsOptions>('input1') in changes ||
           nameof<MathDivideRelationsOptions>('input2') in changes)
        {
            if (isNumber(this.input1) &&
                isNumber(this.input2))
            {
                if (this.input2 === 0)
                {
                    this.result = null;
                    return;
                }

                this.result = this.input1 / this.input2;
                return;
            }

            if (!isPresent(this.input1))
            {
                this.result = 0;
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