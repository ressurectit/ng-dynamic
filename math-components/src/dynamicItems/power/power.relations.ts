import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isPresent, nameof} from '@jscrpt/common';

import {MathPowerRelationsMetadataLoader} from './power.metadata';
import {MathPowerRelationsOptions} from './power.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathPowerRelationsMetadataLoader)
export class MathPowerRelations implements RelationsComponent<MathPowerRelationsOptions>
{
    //######################### public proeperties - inputs #########################

    @Input()
    public input: number|null|undefined;

    //######################### public properties - dynamic outputs #########################

    @DynamicOutput()
    public result: number|null|undefined;

    //######################### public properties #########################

    relationsOptions: MathPowerRelationsOptions|undefined;

    //######################### public methods #########################

    public invalidateVisuals(): void
    {
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MathPowerRelationsOptions>('input') in changes ||
           nameof<MathPowerRelationsOptions>('exponent') in changes)
        {
            if (!isPresent(this.input) ||
                !this.relationsOptions?.exponent)
            {
                this.result = null;
                return;
            }

            this.result = Math.pow(this.input, this.relationsOptions?.exponent);
        }
    }

}