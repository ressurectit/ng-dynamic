import {Inject, Injectable, OnDestroy, Optional, SimpleChanges} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {Dictionary, isBlank, noop, NoopAction} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {RelationsComponent, RelationsComponentMetadata} from '../../interfaces';
import {RelationsComponentManager} from '../relationsComponentManager/relationsComponentManager.service';
import {RelationsManager} from '../relationsManager/relationsManager.service';
import {RelationsProcessorComponentData, RelationsProcessorInputOutputData} from './relationsProcessor.interface';
import {RELATIONS_COMPONENTS_LOADER} from '../../misc/tokens';
import {RelationsComponentDef} from '../../misc/types';

/**
 * Processor that applies relations to registered components
 */
@Injectable()
export class RelationsProcessor implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Promise used for indication that processor was initialized
     */
    protected _initialized: Promise<void> = Promise.resolve();

    /**
     * Resolves initialized
     */
    protected _resolveInitialized: NoopAction = noop;

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

    //######################### public properties #########################

    /**
     * Gets promise that completes when processor was initialized
     */
    public get initialized(): Promise<void>
    {
        return this._initialized;
    }

    //######################### constructor #########################
    constructor(protected _relationsManager: RelationsManager,
                protected _componentManager: RelationsComponentManager,
                @Inject(RELATIONS_COMPONENTS_LOADER) protected _loader: DynamicItemLoader<RelationsComponentDef>,
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

        this._destroyRelations();
    }
    
    //######################### public methods #########################

    /**
     * Updates relations
     * @param id - Id of component to be registered
     */
    public updateRelations(id: string): void
    {
        const relations: RelationsProcessorComponentData = this._relations[id];
        const backwardRelations = this._backwardRelations[id];
        let components = this._componentManager.get(id);

        //this component has no relations
        if(!relations && !backwardRelations?.length || !components)
        {
            this._logger?.debug('RelationsProcessor: No relations for {@id}', {id});

            return;
        }

        //initialize default value from connection to this
        if(backwardRelations?.length)
        {
            backwardRelations.forEach(inputOutput =>
            {
                this._initBackwardRelation(inputOutput);
            });
        }

        if(relations?.inputOutputs)
        {
            if(!Array.isArray(components))
            {
                components = [components];
            }

            for(const inputOutput of relations.inputOutputs)
            {
                let inputComponents = this._componentManager.get(inputOutput.inputComponentId);

                if(inputComponents && !Array.isArray(inputComponents))
                {
                    inputComponents = [inputComponents];
                }

                for(const outputComponent of components)
                {
                    const outputObservable = (outputComponent as any)[`${inputOutput.outputName}Change`] as Observable<any>;

                    //check whether is observable output
                    if(!(outputObservable instanceof Observable))
                    {
                        this._logger?.warn('RelationsProcessor: Output on component {@data} is not observable', inputOutput);

                        continue;
                    }

                    //destroy existing subscriptions if there are any
                    relations.outputsChangeSubscriptions?.forEach(subscription => subscription.unsubscribe());
                    relations.outputsChangeSubscriptions = [];

                    //set listening for output changes
                    relations.outputsChangeSubscriptions.push(outputObservable.subscribe(() =>
                    {
                        let inputs = this._componentManager.get(inputOutput.inputComponentId);

                        if(!inputs)
                        {
                            this._logger?.warn('RelationsProcessor: Missing input components {@data} on output change', inputOutput);

                            return;
                        }

                        if(!Array.isArray(inputs))
                        {
                            inputs = [inputs];
                        }

                        for(const input of inputs)
                        {
                            this._transferData(outputComponent, inputOutput.outputName, input, inputOutput.inputName, false);
                        }
                    }));

                    if(!inputComponents || !Array.isArray(inputComponents))
                    {
                        this._logger?.warn('RelationsProcessor: Missing input components {@data}', inputOutput);

                        continue;
                    }

                    for(const inputComponent of inputComponents)
                    {
                        //initialize default value from this to its connections
                        if(!inputOutput.initialized)
                        {
                            inputOutput.initialized = this._transferData(outputComponent, inputOutput.outputName, inputComponent, inputOutput.inputName, true);
                        }
                    }
                }
            }
        }
    }
    
    /**
     * Method used for destroying component
     */
    public destroyComponent(id: string): void
    {
        const metadata: RelationsProcessorComponentData = this._relations[id];
        const backwardRelations = this._backwardRelations[id];

        //uninitialize backward relations
        if(backwardRelations)
        {
            for(const relation of backwardRelations)
            {
                relation.initialized = false;
            }
        }

        //destroy relations
        if(metadata)
        {
            metadata.outputsChangeSubscriptions.forEach(subscription => subscription.unsubscribe());
            metadata.outputsChangeSubscriptions = [];

            if(metadata.inputOutputs && Array.isArray(metadata.inputOutputs))
            {
                for(const inputOutput of metadata.inputOutputs)
                {
                    inputOutput.initialized = false;
                }
            }

            //destroy auto created components and unregister them
            if(metadata.autoCreated)
            {
                let components = this._componentManager.get(id);

                if(!components)
                {
                    return;
                }

                if(!Array.isArray(components))
                {
                    components = [components];
                }

                this._componentManager.unregisterComponent(id);

                for(const cmp of components)
                {
                    cmp.ngOnDestroy?.();
                }
            }
        }
    }

    //######################### protected methods #########################

    /**
     * Initialize relations from metadata
     */
    protected async _initializeRelations(): Promise<void>
    {
        await this._destroyRelations();
        this._setInitializePromise();

        this._logger?.debug('RelationsProcessor: initializing relations');

        //empty relations
        if(!this._relationsManager.relations.length)
        {
            this._resolveInitialized();

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
                        initialized: false,
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
            await this._initComponent(meta, outputs);
        }

        this._resolveInitialized();
    }

    /**
     * Initialize backward relations
     * @param inputOutput - Data for input and output
     */
    protected _initBackwardRelation(inputOutput: RelationsProcessorInputOutputData): void
    {
        let outputComponents = this._componentManager.get(inputOutput.outputComponentId);
        let inputComponents = this._componentManager.get(inputOutput.inputComponentId);

        if((isBlank(outputComponents) || Array.isArray(outputComponents) && !outputComponents.length) ||
           (isBlank(inputComponents) || Array.isArray(inputComponents) && !inputComponents.length))
        {
            this._logger?.warn('RelationsProcessor: missing metadata for backward relations {@data}', inputOutput);

            return;
        }

        if(!Array.isArray(inputComponents))
        {
            inputComponents = [inputComponents];
        }

        if(!Array.isArray(outputComponents))
        {
            outputComponents = [outputComponents];
        }

        for(const inputCmp of inputComponents)
        {
            for(const outputCmp of outputComponents)
            {
                if(!inputOutput.initialized)
                {
                    inputOutput.initialized = this._transferData(outputCmp, inputOutput.outputName, inputCmp, inputOutput.inputName, true);
                }
            }
        }
    }

    /**
     * Transfers data from source property to target property
     * @param source Instance of source object containing source property with data
     * @param sourceProperty Name of source property with data that are transfered
     * @param target Instance of target object containing target property for data
     * @param targetProperty Name of target property which will be filled with data
     * @param initial Indication whether is transfer of data initial, or on event
     */
    protected _transferData(source: RelationsComponent, sourceProperty: string, target: RelationsComponent, targetProperty: string, initial: boolean): boolean
    {
        if(!source || !target)
        {
            return false;
        }

        const previousValue = (target as any)[targetProperty];
        const currentValue = (source as any)[sourceProperty];
        (target as any)[targetProperty] = (source as any)[sourceProperty];
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

        return true;
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
            this.updateRelations(meta.id);

            return;
        }

        const componentMeta = await this._loader.loadItem(meta);

        if(!componentMeta)
        {
            this._logger?.warn('RelationsProcessor: Unable to load relations component! {@meta}', {package: meta.package, name: meta.name});

            return;
        }

        const instance = new componentMeta.data();
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

    /**
     * Sets initialized promise
     */
    protected _setInitializePromise(): void
    {
        this._initialized = new Promise(resolve => this._resolveInitialized = resolve);
    }

    /**
     * Destroys initialized relations
     */
    protected async _destroyRelations(): Promise<void>
    {
        await this._initialized;

        Object.keys(this._relations).forEach(id => this.destroyComponent(id));

        this._relations = {};
        this._backwardRelations = {};
    }
}