import {Input, SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {MathAddRelationsMetadataLoader} from './add.metadata';
import {MathAddRelationsOptions} from './add.options';

@PureRelationsComponent()
@RelationsEditorMetadata(MathAddRelationsMetadataLoader)
export class MathAddRelations implements RelationsComponent<MathAddRelationsOptions>
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
    public relationsOptions: MathAddRelationsOptions|undefined;

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
        if(nameof<MathAddRelationsOptions>('input1') in changes ||
           nameof<MathAddRelationsOptions>('input2') in changes)
        {
            if (!this.input1)
            {
                this.result = this.input2;
                return;
            }

            if (!this.input2)
            {
                this.result = this.input1;
                return;
            }

            this.result = this.input1 + this.input2;
        }
    }

}