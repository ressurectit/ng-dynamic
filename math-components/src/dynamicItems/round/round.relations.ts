import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isBlank, isPresent, nameof} from '@jscrpt/common';

import {MathRoundRelationsMetadataLoader} from './round.metadata';
import {MathRoundRelationsOptions} from './round.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathRoundRelationsMetadataLoader)
export class MathRoundRelations implements RelationsComponent<MathRoundRelationsOptions>
{
    //######################### public proeperties - inputs #########################

    @Input()
    public input: number|null|undefined;

    //######################### public properties - dynamic outputs #########################

    @DynamicOutput()
    public result: number|null|undefined;

    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: MathRoundRelationsOptions|undefined;

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
        if(nameof<MathRoundRelationsOptions>('input') in changes ||
           nameof<MathRoundRelationsOptions>('decimalPlace') in changes)
        {
            if (!isPresent(this.input))
            {
                this.result = 0;
                return;
            }

            if (!isPresent(this.relationsOptions) ||
                isBlank(this.relationsOptions?.decimalPlace))
            {
                this.result = this.input;
                return;
            }

            const pow10 = Math.pow(10, this.relationsOptions.decimalPlace);

            this.result = Math.round(this.input * pow10) / pow10;
        }
    }

}