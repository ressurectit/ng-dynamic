import {Injector, Input, SimpleChanges} from '@angular/core';
import {CodeExecutor, DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {DeconstructRelationsMetadataLoader} from './deconstruct.metadata';
import {DeconstructRelationsOptions} from './deconstruct.options';

/**
 * Deconstruct relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(DeconstructRelationsMetadataLoader)
export class DeconstructRelations<TState = unknown> implements RelationsComponent<DeconstructRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: DeconstructRelationsOptions|undefined|null;

    /**
     * Code executor used for execution o
     */
    protected codeExecutor: CodeExecutor = this.injector.get(CodeExecutor);

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): DeconstructRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: DeconstructRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - inputs #########################

    /**
     * Initial state value that is set
     */
    @Input()
    public initState: TState|undefined|null;

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
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DeconstructRelations>('initState') in changes)
        {
            this.state = this.initState;
        }
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize rest relations
     */
    protected initialize(): void
    {
        // if(this.relationsOptions)
        // {
        //     if(this.relationsOptions.inputFunctions)
        //     {
        //         for(const name in this.relationsOptions.inputFunctions)
        //         {
        //             const inputFuncData = this.relationsOptions.inputFunctions[name];

        //             if(inputFuncData.code)
        //             {
        //                 Object.defineProperty(this,
        //                                       name,
        //                                       {
        //                                           configurable: true,
        //                                           enumerable: true,
        //                                           set: async value =>
        //                                           {
        //                                               if(!inputFuncData.code)
        //                                               {
        //                                                   return;
        //                                               }

        //                                               const inputFunc = await this.codeExecutor.loadData<InputFunction>(inputFuncData.id, inputFuncData.code);
  
        //                                               if(!inputFunc)
        //                                               {
        //                                                   return;
        //                                               }
                                          
        //                                               try
        //                                               {
        //                                                   inputFunc.bind(this)(value);
        //                                               }
        //                                               catch(e)
        //                                               {
        //                                                   console.error(e);
        //                                               }
        //                                           }
        //                                       });
        //             }
        //         }
        //     }
        // }
    }
}