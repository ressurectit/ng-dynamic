import {Injector, Input, SimpleChanges} from '@angular/core';
import {CodeExecutor, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {TransformDataRelationsMetadataLoader} from './transformData.metadata';
import {TransformDataRelationsOptions} from './transformData.options';
import {TransformData} from './transformData.interface';

/**
 * Transform data relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(TransformDataRelationsMetadataLoader)
export class TransformDataRelations<TData = any, TTransformedData = any> implements RelationsComponent<TransformDataRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: TransformDataRelationsOptions|undefined|null;

    /**
     * Code executor used for execution o
     */
    protected codeExecutor: CodeExecutor;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): TransformDataRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: TransformDataRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;
    }

    //######################### public properties - inputs #########################

    /**
     * Data to be transformed
     */
    @Input()
    public data: TData|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Transformed data
     */
    @DynamicOutput()
    public transformedData: TTransformedData|undefined|null;

    //######################### constructor #########################
    constructor(protected injector: Injector,)
    {
        this.codeExecutor = this.injector.get(CodeExecutor);
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * @inheritdoc
     */
    public async dynamicOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<TransformDataRelations>('data') in changes)
        {
            if(!this.relationsOptions)
            {
                return;
            }

            const transformer = await this.codeExecutor.loadData<TransformData>(this.relationsOptions.id, this.relationsOptions.code);

            if(!transformer)
            {
                return;
            }

            try
            {
                this.transformedData = transformer(this.data);
            }
            catch(e)
            {
                console.error(e);
            }
        }
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}