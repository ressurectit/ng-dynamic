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
        this._initSubscriptions.add(this._relationsManager.relationsChange.subscribe(() => this.initializeRelations()));

        this.initializeRelations();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();

        this.destroyRelations();
    }
    
    //######################### public methods #########################

    /**
     * Updates relations
     * @param id - Id of component to be registered
     */
    public updateRelations(id: string): void
    {
        this._logger?.debug('RelationsProcessor: Updating relations for {@id}', {id});

        const relations: RelationsProcessorComponentData = this._relations[id];
        const backwardRelations = this._backwardRelations[id];
        let components = this._componentManager.get(id);

        //this component has no relations
        if(!relations || !components)
        {
            this._logger?.warn('RelationsProcessor: No relations for {@id}', {id});

            return;
        }

        this.initOptions(components, relations);

        //initialize default value from connection to this
        if(backwardRelations?.length)
        {
            backwardRelations.forEach(inputOutput =>
            {
                this.initBackwardRelation(inputOutput);
            });
        }

        if(relations?.inputOutputs)
        {
            if(!Array.isArray(components))
            {
                components = [components];
            }

            //destroy existing subscriptions if there are any
            relations.outputsChangeSubscriptions?.forEach(subscription => subscription.unsubscribe());
            relations.outputsChangeSubscriptions = [];

            for(const inputOutput of relations.inputOutputs)
            {
                let inputComponents = this._componentManager.get(inputOutput.inputComponentId);

                if(inputComponents && !Array.isArray(inputComponents))
                {
                    inputComponents = [inputComponents];
                }

                this._logger?.verbose('RelationsProcessor: processing input outputs {@data} ', {id, inputOutput, inputComponents, components});

                for(const outputComponent of components)
                {
                    const outputObservable = (outputComponent as any)[`${inputOutput.outputName}Change`] as Observable<any>;

                    //check whether is observable output
                    if(!(outputObservable instanceof Observable))
                    {
                        this._logger?.warn('RelationsProcessor: Output on component {@data} is not observable', inputOutput);

                        continue;
                    }

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
                            this.transferData(outputComponent, inputOutput.outputName, input, inputOutput.inputName, false);
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
                            inputOutput.initialized = this.transferData(outputComponent, inputOutput.outputName, inputComponent, inputOutput.inputName, true);
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
            metadata.optionsInitialized = false;

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
    protected async initializeRelations(): Promise<void>
    {
        await this.destroyRelations();
        this.setInitializePromise();

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
            await this.initComponent(meta, outputs);
        }

        this._resolveInitialized();
    }

    /**
     * Initialize backward relations
     * @param inputOutput - Data for input and output
     */
    protected initBackwardRelation(inputOutput: RelationsProcessorInputOutputData): void
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
                    inputOutput.initialized = this.transferData(outputCmp, inputOutput.outputName, inputCmp, inputOutput.inputName, true);
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
    protected transferData(source: RelationsComponent, sourceProperty: string, target: RelationsComponent, targetProperty: string, initial: boolean): boolean
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

        target.ngOnChanges?.(changes);
        target.invalidateVisuals();

        return true;
    }

    /**
     * Initialize relation component 
     * @param meta - Metadata for relations component
     * @param outputs - Array of outputs data for relations component
     */
    protected async initComponent(meta: RelationsComponentMetadata, outputs: RelationsProcessorInputOutputData[]): Promise<void>
    {
        const component = this._componentManager.get(meta.id);

        if(component)
        {
            this.initRelation(false, meta, outputs);
            this.updateRelations(meta.id);

            return;
        }

        const componentMeta = await this._loader.loadItem(meta);

        if(!componentMeta)
        {
            this.initRelation(false, meta, outputs);

            this._logger?.warn('RelationsProcessor: Unable to load relations component! {@meta}', {package: meta.package, name: meta.name});

            return;
        }

        const instance = new componentMeta.data();
        this._componentManager.registerComponent(meta.id, instance);

        this.initRelation(true, meta, outputs);
        this.updateRelations(meta.id);
    }

    /**
     * Initialize relation for metadata and component
     * @param autoCreated - Indication whether was component auto created or not
     * @param meta - Metadata for relations component
     * @param outputs - Array of outputs data for relations
     */
    protected initRelation(autoCreated: boolean, meta: RelationsComponentMetadata, outputs: RelationsProcessorInputOutputData[]): void
    {
        this._relations[meta.id] =
        {
            autoCreated,
            inputOutputs: outputs,
            outputsChangeSubscriptions: [],
            optionsInitialized: false,
            metadataOptions: meta.relationsOptions,
        };
    }

    /**
     * Initialize relations component options
     * @param components - Components which options should be initialized
     * @param meta - Metadata containing options for initialization
     */
    protected initOptions(components: RelationsComponent|RelationsComponent[], meta: RelationsProcessorComponentData): void
    {
        if(meta.optionsInitialized)
        {
            return;
        }

        meta.optionsInitialized = true;

        if(Array.isArray(components))
        {
            for(const comp of components)
            {
                comp.relationsOptions = meta.metadataOptions;
            }
        }
        else
        {
            components.relationsOptions = meta.metadataOptions;
        }
    }

    /**
     * Sets initialized promise
     */
    protected setInitializePromise(): void
    {
        this._initialized = new Promise(resolve => this._resolveInitialized = resolve);
    }

    /**
     * Destroys initialized relations
     */
    protected async destroyRelations(): Promise<void>
    {
        await this._initialized;

        Object.keys(this._relations).forEach(id => this.destroyComponent(id));

        this._relations = {};
        this._backwardRelations = {};
    }
}