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
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: LogicalAndRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): LogicalAndRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: LogicalAndRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### protected methods #########################

    //######################### public properties - inputs #########################
    
    /**
     * Condition 1 which value will used in logical and operation
     */
    public cond1: boolean = false;

    /**
     * Condition 2 which value will used in logical and operation
     */
    public cond2: boolean = false;

    /**
     * Dynamic conditions used in logical and operation
     */
    public dynamicConditions: {[key: string]: boolean} = {};

    //######################### public properties - dynamic outputs #########################

    /**
     * Logical and result value
     */
    @DynamicOutput()
    public result: boolean|undefined|null = false;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<LogicalAndRelations>('cond1') in changes ||
           nameof<LogicalAndRelations>('cond2') in changes)
        {
            this.evaluateResult();
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize logical and relations
     */
    protected initialize(): void
    {
        if(this.relationsOptions)
        {
            if(this.relationsOptions?.properties?.length)
            {
                for(const name of this.relationsOptions.properties)
                {
                    if(name)
                    {
                        Object.defineProperty(this,
                                              name,
                                              {
                                                  set: function(value)
                                                  {
                                                      this.dynamicConditions[name] = value;
                                                      this.evaluateResult();
                                                  }
                                              });
                    }
                }
            }
        }
    }

    /**
     * Evaluates conditions result
     */
    protected evaluateResult(): void
    {
        if (this.relationsOptions?.properties?.length)
        {
            for (const name of this.relationsOptions.properties)
            {
                if (!this.dynamicConditions[name])
                {
                    this.result = false;
                    return;
                }
            }
        }

        this.result = this.cond1 && this.cond2;
    }
}