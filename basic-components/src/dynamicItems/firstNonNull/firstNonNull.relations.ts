import {SimpleChanges} from '@angular/core';
import {DebugData, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {FirstNonNullRelationsMetadataLoader} from './firstNonNull.metadata';
import {FirstNonNullRelationsOptions} from './firstNonNull.options';

/**
 * First non null relations component
 */
@DebugData(
{
    inputs: 
    [
        nameof<FirstNonNullRelations>('data1'),
        nameof<FirstNonNullRelations>('data2'),
    ],
    outputs: 
    [
        nameof<FirstNonNullRelations>('data'),
    ],
})
@PureRelationsComponent()
@RelationsEditorMetadata(FirstNonNullRelationsMetadataLoader)
export class FirstNonNullRelations implements RelationsComponent<FirstNonNullRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: FirstNonNullRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): FirstNonNullRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: FirstNonNullRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - inputs #########################
    
    /**
     * First data to be cheched
     */
    public data1: unknown;

    /**
     * Next data to be checked
     */
    public data2: unknown;

    /**
     * Dynamic data values to be checked
     */
    public dynamicData: {[key: string]: unknown} = {};

    //######################### public properties - dynamic outputs #########################

    /**
     * Resulting data
     */
    @DynamicOutput()
    public data: unknown;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<FirstNonNullRelations>('data1') in changes || nameof<FirstNonNullRelations>('data2') in changes)
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
                                                      this.dynamicData[name] = value;
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
        if(this.data1)
        {
            this.data = this.data1;
            return;
        }
        
        if(this.data2)
        {
            this.data = this.data2;
            return;
        }

        if (this.relationsOptions?.properties?.length)
        {
            for (const name of this.relationsOptions.properties)
            {
                if (this.dynamicData[name])
                {
                    this.data = this.dynamicData[name];
                    return;
                }
            }
        }
    }
}