import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {LogicalOrRelationsMetadataLoader} from './logicalOr.metadata';
import {LogicalOrRelationsOptions} from './logicalOr.options';

/**
 * Logical or relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(LogicalOrRelationsMetadataLoader)
export class LogicalOrRelations implements RelationsComponent<LogicalOrRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: LogicalOrRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################
    
    /**
     * Condition 1 which value will used in logical or operation
     */
    public cond1: boolean = false;

    /**
     * Condition 2 which value will used in logical or operation
     */
    public cond2: boolean = false;

    //######################### public properties - dynamic outputs #########################

    /**
     * Logical or result value
     */
    @DynamicOutput()
    public result: boolean = true;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<LogicalOrRelations>('cond1') in changes ||
           nameof<LogicalOrRelations>('cond2') in changes)
        {
            this.result = this.cond1 || this.cond2;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}