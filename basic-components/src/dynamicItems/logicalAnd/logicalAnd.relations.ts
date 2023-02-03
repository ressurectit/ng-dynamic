import {SimpleChanges} from '@angular/core';
import {DebugData, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {LogicalAndRelationsMetadataLoader} from './logicalAnd.metadata';
import {LogicalAndRelationsOptions} from './logicalAnd.options';

/**
 * Logical and relations component
 */
@DebugData(
{
    inputs: 
    [
        nameof<LogicalAndRelations>('cond1'),
        nameof<LogicalAndRelations>('cond2'),
    ],
    outputs: 
    [
        nameof<LogicalAndRelations>('result'),
    ],
})
@PureRelationsComponent()
@RelationsEditorMetadata(LogicalAndRelationsMetadataLoader)
export class LogicalAndRelations implements RelationsComponent<LogicalAndRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: LogicalAndRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################
    
    /**
     * Condition 1 which value will used in logical and operation
     */
    public cond1: boolean = false;

    /**
     * Condition 2 which value will used in logical and operation
     */
    public cond2: boolean = false;

    //######################### public properties - dynamic outputs #########################

    /**
     * Logical and result value
     */
    @DynamicOutput()
    public result: boolean|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<LogicalAndRelations>('cond1') in changes ||
           nameof<LogicalAndRelations>('cond2') in changes)
        {
            this.result = this.cond1 && this.cond2;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}