import {SimpleChanges} from '@angular/core';
import {DebugData, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {LogicalOrRelationsMetadataLoader} from './logicalOr.metadata';
import {LogicalOrRelationsOptions} from './logicalOr.options';
import {LogicalAndRelations} from '../logicalAnd/logicalAnd.relations';

/**
 * Logical or relations component
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
@RelationsEditorMetadata(LogicalOrRelationsMetadataLoader)
export class LogicalOrRelations implements RelationsComponent<LogicalOrRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: LogicalOrRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): LogicalOrRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: LogicalOrRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - inputs #########################
    
    /**
     * Condition 1 which value will used in logical or operation
     */
    public cond1: boolean = false;

    /**
     * Condition 2 which value will used in logical or operation
     */
    public cond2: boolean = false;

    /**
     * Dynamic conditions used in logical and operation
     */
    public dynamicConditions: {[key: string]: boolean} = {};

    //######################### public properties - dynamic outputs #########################

    /**
     * Logical or result value
     */
    @DynamicOutput()
    public result: boolean|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<LogicalOrRelations>('cond1') in changes ||
           nameof<LogicalOrRelations>('cond2') in changes)
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
            if(this.relationsOptions.properties.length)
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
        if (this.relationsOptions?.properties.length)
        {
            for (const name of this.relationsOptions.properties)
            {
                if (this.dynamicConditions[name])
                {
                    this.result = true;
                    return;
                }
            }
        }

        this.result = this.cond1 || this.cond2;
    }
}