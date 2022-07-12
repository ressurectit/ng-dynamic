import {Inject, Injectable, OnDestroy, Optional, SimpleChanges} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {RelationsComponent, RelationsComponentMetadata} from '../../interfaces';
import {RelationsComponentManager} from '../relationsComponentManager/relationsComponentManager.service';
import {RelationsManager} from '../relationsManager/relationsManager.service';
import {RelationsProcessorComponentData, RelationsProcessorInputOutputData} from './relationsProcessor.interface';
import {DynamicItemLoader} from '../../../../src';
import {RELATIONS_COMPONENT_LOADER} from '../../misc/tokens';

/**
 * Processor that applies relations to registered components
 */
@Injectable()
export class RelationsProcessor implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Relations metadata
     */
    protected _relations: Dictionary<RelationsProcessorComponentData> = {};

    /**
     * Array of backward relations, relations that are used for obtaining data for inputs
     */
    protected _backwardRelations: Dictionary<RelationsProcessorInputOutputData[]> = {};

    //######################### constructor #########################
    constructor(protected _relationsManager: RelationsManager,
                protected _componentManager: RelationsComponentManager,
                @Inject(RELATIONS_COMPONENT_LOADER) protected _loader: DynamicItemLoader,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
        this._initSubscriptions.add(this._relationsManager.relationsChange.subscribe(() => this._initializeRelations()));

        this._initializeRelations();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();

        // Object.keys(this._relations).forEach(id => this.destroyComponent(id));

        // this._relations = {};
        // this._backwardRelations = {};
    }
    
    //######################### public methods #########################

    /**
     * Updates relations
     * @param id Id of component to be registered
     * @param component Component instance
     */
    public updateRelations(id: string): void
    {
        // const metadata: DynamicComponentRelationManagerMetadata = this._relations[id];
        // const backwardMetadata = this._backwardRelations[id];

        // //this component has no relations
        // if(!metadata && (!backwardMetadata || !backwardMetadata.length))
        // {
        //     return;
        // }

        // //initialize default value from connection to this
        // if(backwardMetadata && backwardMetadata.length)
        // {
        //     backwardMetadata.forEach(inputOutput =>
        //     {
        //         inputOutput.inputInstance = component;

        //         this._initBackwardRelation(inputOutput.outputNodeId, inputOutput);
        //     });
        // }

        // if(metadata)
        // {
        //     metadata.inputOutputs.forEach(inputOutput =>
        //     {
        //         //initialize default value from this to its connections
        //         this._transferData(component, inputOutput.outputName, inputOutput.inputInstance, inputOutput.inputName, true);

        //         //set listening for output changes
        //         metadata.outputsChangeSubscriptions.push(component[`${inputOutput.outputName}Change`].subscribe(() =>
        //         {
        //             this._transferData(component, inputOutput.outputName, inputOutput.inputInstance, inputOutput.inputName, false);
        //         }));
        //     });
        // }
    }
    
    /**
     * Method used for destroying component
     */
    public destroyComponent(id: string): void
    {
        // const metadata: DynamicComponentRelationManagerMetadata = this._relations[id];
        // const backwardMetadata = this._backwardRelations[id];

        // //destroy backward relations
        // if(backwardMetadata && backwardMetadata.length)
        // {
        //     backwardMetadata.forEach(inputoutput =>
        //     {
        //         inputoutput.inputInstance = null;
        //     });
        // }

        // //destroy relations
        // if(metadata)
        // {
        //     metadata.outputsChangeSubscriptions.forEach(subscription => subscription.unsubscribe());
        //     metadata.outputsChangeSubscriptions = [];

        //     if(metadata.nodeInstance)
        //     {
        //         metadata.nodeInstance.destroy();
        //     }
        // }
    }

    //######################### protected methods #########################

    /**
     * Initialize relations from metadata
     */
    protected async _initializeRelations(): Promise<void>
    {
        //empty relations
        if(!this._relationsManager.relations.length)
        {
            return;
        }

        for(const meta of this._relationsManager.relations)
        {
            const outputs: RelationsProcessorInputOutputData[] = [];

            //no outputs metadata
            if(!meta.outputs)
            {
                continue;
            }

            for(const output of meta.outputs)
            {
                //no inputs metadata
                if(!output.inputs)
                {
                    continue;
                }

                for(const input of output.inputs)
                {
                    const inputOutput: RelationsProcessorInputOutputData = 
                    {
                        inputComponentId: input.id,
                        outputComponentId: meta.id,
                        inputName: input.inputName,
                        outputName: output.outputName,
                    };

                    outputs.push(inputOutput);

                    if(!this._backwardRelations[input.id])
                    {
                        this._backwardRelations[input.id] = [];
                    }

                    this._backwardRelations[input.id].push(inputOutput);
                }
            }

            //sets options for relations component
            this._initComponent(meta, outputs);
        }
    }

    /**
     * Initialize backward relation
     * @param id Id of component that is source of relation
     * @param inputOutputMetadata Metadata for input and output
     */
    protected _initBackwardRelation(id: string, inputOutputMetadata: RelationsProcessorInputOutputData): void
    {
        // const relation = this._relations[id];
        // const nodeInstance = relation && relation.nodeInstance;

        // this._transferData(nodeInstance || this.componentManager.get(id), inputOutputMetadata.outputName, inputOutputMetadata.inputInstance, inputOutputMetadata.inputName, true);
    }

    /**
     * Transfers data from source property to target property
     * @param source Instance of source object containing source property with data
     * @param sourceProperty Name of source property with data that are transfered
     * @param target Instance of target object containing target property for data
     * @param targetProperty Name of target property which will be filled with data
     * @param initial Indication whether is transfer of data initial, or on event
     */
    protected _transferData(source: RelationsComponent, sourceProperty: string, target: RelationsComponent, targetProperty: string, initial: boolean): void
    {
        if(!source || !target)
        {
            return;
        }

        const previousValue = target[targetProperty];
        const currentValue = source[sourceProperty];
        target[targetProperty] = source[sourceProperty];
        const changes: SimpleChanges = {};

        changes[targetProperty] = 
        {
            previousValue,
            currentValue,
            firstChange: initial,
            isFirstChange: () => initial
        };

        target.ngOnChanges(changes);
        target.invalidateVisuals();
    }

    /**
     * Initialize relation component 
     * @param meta - Metadata for relations component
     * @param outputs - Array of outputs data for relations component
     */
    protected async _initComponent(meta: RelationsComponentMetadata, outputs: RelationsProcessorInputOutputData[]): Promise<void>
    {
        const component = this._componentManager.get(meta.id);

        if(component)
        {
            this._initRelation(component, false, meta, outputs);

            return;
        }

        const componentMeta = await this._loader.loadItem(meta);

        if(!componentMeta)
        {
            this._logger?.warn('RelationsProcessor: Unable to load relations component! {@meta}', {package: meta.package, name: meta.name});

            return;
        }

        const instance = new componentMeta.type();
        this._componentManager.registerComponent(meta.id, instance);

        this._initRelation(instance, true, meta, outputs);
        this.updateRelations(meta.id);
    }

    /**
     * Initialize relation for metadata and component
     * @param component - Instance of component which relation will be initialized
     * @param autoCreated - Indication whether was component auto created or not
     * @param meta - Metadata for relations component
     * @param outputs - Array of outputs data for relations
     */
    protected _initRelation(component: RelationsComponent|RelationsComponent[], autoCreated: boolean, meta: RelationsComponentMetadata, outputs: RelationsProcessorInputOutputData[]): void
    {
        this._relations[meta.id] =
        {
            autoCreated,
            inputOutputs: outputs,
            outputsChangeSubscriptions: []
        };

        if(Array.isArray(component))
        {
            for(const comp of component)
            {
                comp.relationsOptions = meta.relationsOptions;
            }
        }
        else
        {
            component.relationsOptions = meta.relationsOptions;
        }
    }
}