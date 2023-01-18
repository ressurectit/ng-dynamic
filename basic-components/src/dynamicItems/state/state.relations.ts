import {Injector, SimpleChanges} from '@angular/core';
import {CodeExecutor, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
// import {nameof} from '@jscrpt/common';

import {StateRelationsMetadataLoader} from './state.metadata';
import {StateRelationsOptions} from './state.options';
import {StatefullClass} from './state.interface';

/**
 * State relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(StateRelationsMetadataLoader)
export class StateRelations<TState = unknown> implements RelationsComponent<StateRelationsOptions>, StatefullClass<TState>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: StateRelationsOptions|undefined|null;

    /**
     * Code executor used for execution o
     */
    protected codeExecutor: CodeExecutor = this.injector.get(CodeExecutor);

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): StateRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: StateRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;
    }

    //######################### public properties - outputs #########################

    /**
     * Data that represents current state
     */
    @DynamicOutput()
    public state: TState|undefined|null;

    //######################### constructor #########################
    constructor(protected injector: Injector,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        // if(nameof<StateRelations>('data') in changes)
        // {
        //     if(!this.relationsOptions)
        //     {
        //         return;
        //     }

        //     const transformer = await this.codeExecutor.loadData<TransformData>(this.relationsOptions.id, this.relationsOptions.code);

        //     if(!transformer)
        //     {
        //         return;
        //     }

        //     try
        //     {
        //         this.transformedData = transformer(this.data);
        //     }
        //     catch(e)
        //     {
        //         console.error(e);
        //     }
        // }
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}