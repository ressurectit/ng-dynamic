import {inject, Inject, Injectable, Injector, OnDestroy, Optional} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {Dictionary, isBlank, noop, NoopAction, isStrictEquals} from '@jscrpt/common';
import {Observable, Subscription} from 'rxjs';

import {RelationsComponent, RelationsComponentMetadata, RelationsComponentType} from '../../interfaces';
import {RelationsComponentManager} from '../relationsComponentManager/relationsComponentManager.service';
import {RelationsManager} from '../relationsManager/relationsManager.service';
import {RelationsDataTransferInstruction, RelationsProcessorComponentData, RelationsProcessorInputOutputData} from './relationsProcessor.interface';
import {RELATIONS_COMPONENTS_LOADER, RELATIONS_PROCESSOR_SKIP_INIT} from '../../misc/tokens';
import {RelationsComponentDef, RelationsProcessorComponent} from '../../misc/types';
import {RelationsDataTransferInstructionImpl} from './relationsDataTransferInstruction';
import {isAssigned, isSkipInit} from '../../misc/utils';
import {RelationsChangeDetector} from '../relationsChangeDetector/relationsChangeDetector.service';
import {RelationsDebugger} from '../relationsDebugger/relationsDebugger.service';

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
    protected ɵInitialized: Promise<void> = Promise.resolve();

    /**
     * Relations metadata
     */
    protected ɵRelations: Dictionary<RelationsProcessorComponentData> = {};

    /**
     * Array of backward relations, relations that are used for obtaining data for inputs
     */
    protected ɵBackwardRelations: Dictionary<RelationsProcessorInputOutputData[]> = {};

    /**
     * Resolves initialized
     */
    protected resolveInitialized: NoopAction = noop;

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Gets or sets relations metadata
     */
    protected get relations(): Dictionary<RelationsProcessorComponentData>
    {
        if(this.parent)
        {
            return this.parent.relations;
        }

        return this.ɵRelations;
    }
    protected set relations(value: Dictionary<RelationsProcessorComponentData>)
    {
        this.ɵRelations = value;
    }

    /**
     * Gets or sets array of backward relations, relations that are used for obtaining data for inputs
     */
    protected get backwardRelations(): Dictionary<RelationsProcessorInputOutputData[]>
    {
        if(this.parent)
        {
            return this.parent.backwardRelations;
        }

        return this.ɵBackwardRelations;
    }
    protected set backwardRelations(value: Dictionary<RelationsProcessorInputOutputData[]>)
    {
        this.ɵBackwardRelations = value;
    }

    /**
     * Instance of parent relations processor
     */
    protected parent: RelationsProcessor|null = null;

    /**
     * Gets root relations processor
     */
    protected get root(): RelationsProcessor
    {
        return this.parent?.root ?? this.parent ?? this;
    }

    /**
     * Object storing all created scopes
     */
    protected scopes: Record<string, RelationsProcessor[]> = {};

    /**
     * Id of scope
     */
    protected scopeId: string|null = null;

    /**
     * Injected relations change detector
     */
    protected relationsChangeDetector: RelationsChangeDetector = inject(RelationsChangeDetector);

    /**
     * Instance of relations debugger
     */
    protected relationsDebugger: RelationsDebugger|undefined|null = inject(RelationsDebugger, {optional: true});

    //######################### public properties #########################

    /**
     * Gets promise that completes when processor was initialized
     */
    public get initialized(): Promise<void>
    {
        return this.ɵInitialized;
    }

    //######################### constructor #########################
    constructor(protected relationsManager: RelationsManager,
                protected componentManager: RelationsComponentManager,
                protected injector: Injector,
                @Inject(RELATIONS_COMPONENTS_LOADER) protected loader: DynamicItemLoader<RelationsComponentDef>,
                @Inject(LOGGER) @Optional() protected logger?: Logger,
                @Inject(RELATIONS_PROCESSOR_SKIP_INIT) @Optional() skipInit?: boolean,)
    {
        if(!skipInit)
        {
            this.initSubscriptions.add(this.relationsManager.relationsChange.subscribe(() => this.initializeRelations()));

            this.initializeRelations();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();

        this.destroyRelations();
    }

    //######################### public methods #########################

    /**
     * Updates relations
     * @param id - Id of component to be registered
     */
    public updateRelations(id: string): void
    {
        this.logger?.debug('RelationsProcessor: Updating relations for {{@id}}', {id});

        const relations: RelationsProcessorComponentData = this.relations[id];
        const backwardRelations = this.backwardRelations[id];
        let components = this.componentManager.get(id);

        //this component has no relations
        if(!relations || !components)
        {
            this.logger?.warn('RelationsProcessor: No relations for {{@id}}', {id});

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

            for(const outputComponent of components)
            {
                outputComponent.ɵɵRelationsOutputsChangeSubscriptions?.forEach(subscription => subscription.unsubscribe());
                outputComponent.ɵɵRelationsOutputsChangeSubscriptions = [];

                for(const inputOutput of relations.inputOutputs)
                {
                    let inputComponents = this.componentManager.get(inputOutput.inputComponentId);

                    if(inputComponents && !Array.isArray(inputComponents))
                    {
                        inputComponents = [inputComponents];
                    }

                    //TODO revise log output
                    this.logger?.verbose('RelationsProcessor: processing input outputs {{@data}} ', {data: {id, inputOutput}});

                    const outputObservable = (outputComponent as any)[`${inputOutput.outputName}Change`] as Observable<any>;

                    //check whether is observable output
                    if(!(outputObservable instanceof Observable))
                    {
                        this.logger?.warn('RelationsProcessor: Output on component {{@data}} is not observable', {data: inputOutput});

                        continue;
                    }

                    //set listening for output changes
                    outputComponent.ɵɵRelationsOutputsChangeSubscriptions.push(outputObservable.subscribe(() =>
                    {
                        let inputs = this.componentManager.get(inputOutput.inputComponentId);

                        if(!inputs)
                        {
                            this.logger?.warn('RelationsProcessor: Missing input components {{@data}} on output change', {data: inputOutput});

                            return;
                        }

                        if(!Array.isArray(inputs))
                        {
                            inputs = [inputs];
                        }

                        for(const input of inputs)
                        {
                            this.transferData(outputComponent, input, inputOutput, false);
                        }
                    }));

                    if(!inputComponents || !Array.isArray(inputComponents))
                    {
                        this.logger?.warn('RelationsProcessor: Missing input components {{@data}}', {data: inputOutput});

                        continue;
                    }

                    for(const inputComponent of inputComponents)
                    {
                        const id = `${inputComponent.ɵɵRelationsComponentId}-${outputComponent.ɵɵRelationsComponentId}`;

                        //init data transfer only if not marked as skip init and was not initialized and was already at least once assigned
                        if(!isSkipInit(outputComponent, inputOutput.outputName) && !inputOutput.initialized[id] && isAssigned(outputComponent, inputOutput.outputName))
                        {
                            inputOutput.initialized[id] = this.transferData(outputComponent, inputComponent, inputOutput, true);
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
        const metadata: RelationsProcessorComponentData = this.relations[id];
        const backwardRelations = this.backwardRelations[id];

        //uninitialize backward relations
        if(backwardRelations)
        {
            for(const relation of backwardRelations)
            {
                relation.initialized = {};
            }
        }

        //destroy relations
        if(metadata)
        {
            let components = this.componentManager.get(id);

            if(components)
            {
                if(!components)
                {
                    return;
                }

                if(!Array.isArray(components))
                {
                    components = [components];
                }

                for(const cmp of components)
                {
                    cmp.ɵɵRelationsOutputsChangeSubscriptions?.forEach(subscription => subscription.unsubscribe());
                    cmp.ɵɵRelationsOutputsChangeSubscriptions = [];
                    cmp.ɵɵRelationsOptionsInitialized = false;
                }
            }

            if(metadata.inputOutputs && Array.isArray(metadata.inputOutputs))
            {
                for(const inputOutput of metadata.inputOutputs)
                {
                    inputOutput.initialized = {};
                }
            }

            //destroy auto created components and unregister them
            if(metadata.autoCreated)
            {
                let components = this.componentManager.get(id);

                if(!components)
                {
                    return;
                }

                if(!Array.isArray(components))
                {
                    components = [components];
                }

                this.componentManager.unregisterComponent(id);

                for(const cmp of components)
                {
                    cmp.relationsOnDestroy?.();
                }
            }
        }
    }

    /**
     * Opens new scope of relations processor
     * @param id - Id of newly created scope
     * @param componentManager - Scoped instance of component manager
     * @param injector - Injector for current scope
     */
    public openScope(id: string,
                     componentManager: RelationsComponentManager,
                     injector: Injector,): RelationsProcessor
    {
        const processor = new RelationsProcessor(this.relationsManager, componentManager, injector, this.loader, this.logger, true);
        processor.scopeId = id;
        processor.parent = this;

        this.root.scopes[id] ??= [];
        this.root.scopes[id].push(processor);

        for(const componentId in this.relations)
        {
            const relationsDef = this.relations[componentId];

            //Same scope initialize
            if(relationsDef.scope === id && relationsDef.componentType)
            {
                const instance = new relationsDef.componentType(injector);
                componentManager.registerComponent(componentId, instance);
                processor.updateRelations(componentId);
            }
        }

        return processor;
    }

    /**
     * Destroyes opened scope itself
     */
    public destroyScope(): void
    {
        if(!this.scopeId)
        {
            throw new Error('RelationsProcessor: scope id must be present!');
        }

        const index = this.root.scopes[this.scopeId].indexOf(this);

        if(index < 0)
        {
            throw new Error('RelationsProcessor: missing scope!');
        }

        this.root.scopes[this.scopeId].splice(index, 1);

        for(const componentId in this.relations)
        {
            const relationsDef = this.relations[componentId];

            //Same scope initialize
            if(relationsDef.scope === this.scopeId)
            {
                this.destroyComponent(componentId);
            }
        }
    }


    //TODO: update typings with new parameter
    /**
     * Transfers data for specified component using its output relations, all data are transfered in single change set per component
     * @param id - Id of component whose outputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns dictionary with data transfer instructions per components
     */
    public transferOutputsData(id: string, delayed: true, forceTransfer?: boolean): Dictionary<RelationsDataTransferInstruction>
    public transferOutputsData(id: string, delayed: false, forceTransfer?: boolean): null
    public transferOutputsData(id: string, delayed: boolean = false, forceTransfer: boolean = false): null|Dictionary<RelationsDataTransferInstruction>
    {
        const transfers: Dictionary<RelationsDataTransferInstructionImpl> = {};
        const relations: RelationsProcessorComponentData = this.relations[id];
        let components = this.componentManager.get(id);

        if(!relations || !components)
        {
            this.logger?.warn('RelationsProcessor: No relations for {{@id}}', {id});

            return delayed ? transfers : null;
        }

        if(relations?.inputOutputs)
        {
            if(!Array.isArray(components))
            {
                components = [components];
            }

            //for each component containing outputs
            for(const outputComponent of components)
            {
                //for each relation
                for(const inputOutput of relations.inputOutputs)
                {
                    let inputComponents = this.componentManager.get(inputOutput.inputComponentId);

                    if(inputComponents && !Array.isArray(inputComponents))
                    {
                        inputComponents = [inputComponents];
                    }

                    if(!inputComponents || !Array.isArray(inputComponents))
                    {
                        this.logger?.warn('RelationsProcessor: Missing input components {{@data}}', {data: inputOutput});

                        continue;
                    }

                    transfers[inputOutput.inputComponentId] ??= new RelationsDataTransferInstructionImpl(inputComponents);

                    //for each input component
                    for(const inputComponent of inputComponents)
                    {
                        if(!outputComponent || !inputComponent)
                        {
                            continue;
                        }

                        const previousValue = (inputComponent as any)[inputOutput.inputName];
                        const currentValue = (outputComponent as any)[inputOutput.outputName];

                        //ignore changes when previousValue equals to currentValue.
                        if (!forceTransfer && isStrictEquals(previousValue, currentValue))
                        {
                            continue;
                        }

                        const change = transfers[inputOutput.inputComponentId].changes[inputOutput.inputName] =
                        {
                            previousValue,
                            currentValue,
                            firstChange: false,
                            isFirstChange: () => false,
                        };

                        if(ngRelationsDebugger)
                        {
                            this.relationsDebugger?.transferData(transfers[inputOutput.inputComponentId],
                            {
                                change,
                                inputComponentId: inputOutput.inputComponentId,
                                outputComponentId: inputOutput.outputComponentId,
                                outputName: inputOutput.outputName,
                                inputName: inputOutput.inputName,
                                scope: this.scopeId,
                            });
                        }
                    }
                }
            }

            if(!delayed)
            {
                //transfers data
                for(const key in transfers)
                {
                    const transfer = transfers[key];

                    transfer.applyChanges();
                }
            }
        }

        return delayed ? transfers : null;
    }

    /**
     * Transfers data for specified component using its inputs relations, all data are transfered in single change
     * @param id - Id of component whose inputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns transfer instructions
     */
    public transferInputsData(id: string, delayed: true): RelationsDataTransferInstruction
    /**
     * Transfers data for specified component using its inputs relations, all data are transfered in single change
     * @param id - Id of component whose inputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns transfer instructions
     */
    public transferInputsData(id: string, delayed: false): null
    /**
     * Transfers data for specified component using its inputs relations, all data are transfered in single change
     * @param id - Id of component whose inputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns transfer instructions
     * @param inputs - Optional array of inputs that should be displayed
     */
    public transferInputsData(id: string, delayed: true, inputs: string[]): RelationsDataTransferInstruction
    /**
     * Transfers data for specified component using its inputs relations, all data are transfered in single change
     * @param id - Id of component whose inputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns transfer instructions
     * @param inputs - Optional array of inputs that should be displayed
     */
    public transferInputsData(id: string, delayed: false, inputs: string[]): null
    /**
     * Transfers data for specified component using its inputs relations, all data are transfered in single change
     * @param id - Id of component whose inputs relations should be applied to transfer data
     * @param delayed - Indication whether delay data transfer and only generate instructions, if true returns transfer instructions
     * @param inputs - Optional array of inputs that should be displayed
     */
    public transferInputsData(id: string, delayed: boolean = false, inputs?: string[]): null|RelationsDataTransferInstruction
    {
        const backwardRelations = this.backwardRelations[id];
        let inputComponents = this.componentManager.get(id);
        const relation = this.relations[id];

        if(!backwardRelations)
        {
            this.logger?.warn('RelationsProcessor: No backward relations for {{@id}}', {id});

            return delayed ? new RelationsDataTransferInstructionImpl([]) : null;
        }

        if(!inputComponents)
        {
            this.logger?.warn('RelationsProcessor: Missing input components for {{@id}}', {id});

            return delayed ? new RelationsDataTransferInstructionImpl([]) : null;
        }

        //only possibility of multiple inputComponents is if they are in scope
        if(Array.isArray(inputComponents) && isBlank(relation.scope))
        {
            this.logger?.error('RelationsProcessor: Only one component must be available for id {{@id}}', {id});

            return delayed ? new RelationsDataTransferInstructionImpl([]) : null;
        }

        if(!Array.isArray(inputComponents))
        {
            inputComponents = [inputComponents];
        }

        const transfer: RelationsDataTransferInstructionImpl = new RelationsDataTransferInstructionImpl(inputComponents);

        //for each input component
        for(const inputComponent of inputComponents)
        {
            //for each backward relation
            for(const backwardRelation of backwardRelations)
            {
                //skip if input does not exists and inputs are specified
                if(inputs && inputs.indexOf(backwardRelation.inputName) < 0)
                {
                    continue;
                }

                const outputComponent = this.componentManager.get(backwardRelation.outputComponentId);

                if((Array.isArray(outputComponent)))
                {
                    this.logger?.error('RelationsProcessor: Only one output component must be available for id {{@id}}', {id});

                    continue;
                }

                if(!outputComponent || !inputComponent)
                {
                    continue;
                }

                const previousValue = (inputComponent as any)[backwardRelation.inputName];
                const currentValue = (outputComponent as any)[backwardRelation.outputName];

                //ignore changes when previousValue equals to currentValue.
                if (isStrictEquals(previousValue, currentValue))
                {
                    continue;
                }

                const change = transfer.changes[backwardRelation.inputName] =
                {
                    previousValue,
                    currentValue,
                    firstChange: false,
                    isFirstChange: () => false,
                };

                if(ngRelationsDebugger)
                {
                    this.relationsDebugger?.transferData(transfer,
                    {
                        change,
                        inputComponentId: backwardRelation.inputComponentId,
                        outputComponentId: backwardRelation.outputComponentId,
                        outputName: backwardRelation.outputName,
                        inputName: backwardRelation.inputName,
                        scope: this.scopeId,
                    });
                }
            }
        }

        if(!delayed)
        {
            transfer.applyChanges();
        }

        return delayed ? transfer : null;
    }

    //######################### protected methods #########################

    /**
     * Initialize relations from metadata
     */
    protected async initializeRelations(): Promise<void>
    {
        await this.destroyRelations();
        this.setInitializePromise();

        this.logger?.debug('RelationsProcessor: initializing relations');

        //empty relations
        if(!this.relationsManager.relations.length)
        {
            this.resolveInitialized();

            return;
        }

        for(const meta of this.relationsManager.relations)
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
                        initialized: {},
                    };

                    outputs.push(inputOutput);

                    if(!this.backwardRelations[input.id])
                    {
                        this.backwardRelations[input.id] = [];
                    }

                    this.backwardRelations[input.id].push(inputOutput);
                }
            }

            //sets options for relations component
            await this.initComponent(meta, outputs);
        }

        this.relationsChangeDetector.initialize(this.relations);

        if(ngRelationsDebugger)
        {
            this.relationsDebugger?.initialize(this.relations, this.backwardRelations);
        }

        this.resolveInitialized();
    }

    /**
     * Initialize backward relations
     * @param inputOutput - Data for input and output
     */
    protected initBackwardRelation(inputOutput: RelationsProcessorInputOutputData): void
    {
        let outputComponents = this.componentManager.get(inputOutput.outputComponentId);
        let inputComponents = this.componentManager.get(inputOutput.inputComponentId);

        if((isBlank(outputComponents) || Array.isArray(outputComponents) && !outputComponents.length) ||
           (isBlank(inputComponents) || Array.isArray(inputComponents) && !inputComponents.length))
        {
            this.logger?.warn('RelationsProcessor: missing metadata for backward relations {{@data}}', {data: inputOutput});

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
                const id = `${inputCmp.ɵɵRelationsComponentId}-${outputCmp.ɵɵRelationsComponentId}`;

                //init data transfer only if not marked as skip init and was not initialized and was already at least once assigned
                if(!isSkipInit(outputCmp, inputOutput.outputName) && !inputOutput.initialized[id] && isAssigned(outputCmp, inputOutput.outputName))
                {
                    inputOutput.initialized[id] = this.transferData(outputCmp, inputCmp, inputOutput, true);
                }
            }
        }
    }

    /**
     * Transfers data from source property to target property
     * @param source - Instance of source object containing source property with data
     * @param target - Instance of target object containing target property for data
     * @param sourceTarget - Definition of source target names and ids
     * @param initial - Indication whether is transfer of data initial, or on event
     */
    protected transferData(source: RelationsComponent, target: RelationsComponent, sourceTarget: RelationsProcessorInputOutputData, initial: boolean): boolean
    {
        if(!source || !target)
        {
            return false;
        }

        const previousValue = (target as any)[sourceTarget.inputName];
        const currentValue = (source as any)[sourceTarget.outputName];
        const transfer = new RelationsDataTransferInstructionImpl([target]);

        //ignore changes when previousValue equals to currentValue.
        if (isStrictEquals(previousValue, currentValue))
        {
            return false;
        }

        const change = transfer.changes[sourceTarget.inputName] =
        {
            previousValue,
            currentValue,
            firstChange: initial,
            isFirstChange: () => initial
        };

        if(ngRelationsDebugger)
        {
            this.relationsDebugger?.transferData(transfer,
            {
                change,
                inputComponentId: sourceTarget.inputComponentId,
                inputName: sourceTarget.inputName,
                outputComponentId: sourceTarget.outputComponentId,
                outputName: sourceTarget.outputName,
                scope: this.scopeId,
            });
        }

        transfer.applyChanges();

        return true;
    }

    /**
     * Initialize relation component
     * @param meta - Metadata for relations component
     * @param outputs - Array of outputs data for relations component
     */
    protected async initComponent(meta: RelationsComponentMetadata, outputs: RelationsProcessorInputOutputData[]): Promise<void>
    {
        const component = this.componentManager.get(meta.id);

        if(component)
        {
            this.initRelation(false, meta, outputs, meta?.scope ?? null, null);
            this.updateRelations(meta.id);

            return;
        }

        const componentMeta = await this.loader.loadItem(meta);

        if(!componentMeta)
        {
            this.initRelation(false, meta, outputs, meta?.scope ?? null, null);

            this.logger?.warn('RelationsProcessor: Unable to load relations component! {{@meta}}', {meta: {package: meta.package, name: meta.name}});

            return;
        }

        if(!meta.scope)
        {
            const instance = new componentMeta.data(this.injector);
            this.componentManager.registerComponent(meta.id, instance);
        }
        else if(this.scopes[meta.scope])
        {
            for(const scope of this.scopes[meta.scope])
            {
                const instance = new componentMeta.data(scope.injector);
                scope.componentManager.registerComponent(meta.id, instance);
            }
        }

        this.initRelation(true, meta, outputs, meta.scope ?? null, meta.scope ? componentMeta.data : null);
        this.updateRelations(meta.id);
    }

    /**
     * Initialize relation for metadata and component
     * @param autoCreated - Indication whether was component auto created or not
     * @param meta - Metadata for relations component
     * @param inputOutputs - Array of outputs data for relations
     * @param scope - Current scope used for this relations component
     * @param componentType - Type used for creation of relations component (only for scoped ones)
     */
    protected initRelation(autoCreated: boolean, meta: RelationsComponentMetadata, inputOutputs: RelationsProcessorInputOutputData[], scope: string|null, componentType: RelationsComponentType|null): void
    {
        this.relations[meta.id] =
        {
            autoCreated,
            inputOutputs,
            metadataOptions: meta.relationsOptions,
            componentType,
            scope,
        };
    }

    /**
     * Initialize relations component options
     * @param components - Components which options should be initialized
     * @param meta - Metadata containing options for initialization
     */
    protected initOptions(components: RelationsProcessorComponent|RelationsProcessorComponent[], meta: RelationsProcessorComponentData): void
    {
        if(Array.isArray(components))
        {
            for(const comp of components)
            {
                if(!comp.ɵɵRelationsOptionsInitialized)
                {
                    comp.relationsOptions = meta.metadataOptions;
                    comp.ɵɵRelationsOptionsInitialized = true;
                }
            }
        }
        else
        {
            if(!components.ɵɵRelationsOptionsInitialized)
            {
                components.relationsOptions = meta.metadataOptions;
                components.ɵɵRelationsOptionsInitialized = true;
            }
        }
    }

    /**
     * Sets initialized promise
     */
    protected setInitializePromise(): void
    {
        this.ɵInitialized = new Promise(resolve => this.resolveInitialized = resolve);
    }

    /**
     * Destroys initialized relations
     */
    protected async destroyRelations(): Promise<void>
    {
        await this.ɵInitialized;

        Object.keys(this.relations).forEach(id => this.destroyComponent(id));

        this.relations = {};
        this.backwardRelations = {};
    }
}