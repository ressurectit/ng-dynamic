import {Inject, Injectable, Injector, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, generateId, nameof} from '@jscrpt/common';

import {RelationsProcessorComponent} from '../../misc/types';
import {RelationsComponentStateDebugInfo, RelationsDataTransferDebugInfo, RelationsDataTransferIdDebugInfo, RelationsOutputDebugInfo, RelationsStepDebugInfo} from './relationsDebugger.interface';
import {RelationsDataTransferInstructionImpl} from '../relationsProcessor/relationsDataTransferInstruction';
import {RelationsProcessorComponentData, RelationsProcessorInputOutputData} from '../relationsProcessor/relationsProcessor.interface';
import {RelationsComponentManager} from '../relationsComponentManager/relationsComponentManager.service';

const COMPONENT_DEBUGGER_PROPERTY = 'COMPONENT_DEBUGGER_PROPERTY';

/**
 * Definition of component endpoints
 */
interface RelationsComponentEndpoints
{
    /**
     * Array of input names
     */
    inputs: string[];

    /**
     * Array of output names
     */
    outputs: string[]
}

/**
 * Service used for debugging relations
 */
@Injectable()
export class RelationsDebugger
{
    //######################### protected properties #########################

    /**
     * Instance of relations component manager
     */
    protected ɵrelationsComponentManager: RelationsComponentManager|undefined|null;

    /**
     * Registered components by id and their internal ids
     */
    protected components: Dictionary<string[]> = {};

    /**
     * Array of steps recorded by debugger
     */
    protected steps: RelationsStepDebugInfo[] = [];

    /**
     * Definition of component endpoints
     */
    protected componentDefs: Dictionary<RelationsComponentEndpoints> = {};

    /**
     * Gets instance of relations component manager
     */
    protected get relationsComponentManager(): RelationsComponentManager
    {
        return (this.ɵrelationsComponentManager ??= this.injector.get(RelationsComponentManager));
    }

    //######################### constructor #########################
    constructor(protected injector: Injector,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     *
     * @param relations - Relations
     * @param backwardRelations
     */
    public initialize(relations: Dictionary<RelationsProcessorComponentData>, backwardRelations: Dictionary<RelationsProcessorInputOutputData[]>): void
    {
        this.componentDefs = {};

        const addInputOutput = (inputOutput: RelationsProcessorInputOutputData) =>
        {
            this.componentDefs[inputOutput.outputComponentId] ??=
            {
                inputs: [],
                outputs: [],
            };

            if(this.componentDefs[inputOutput.outputComponentId].outputs.indexOf(inputOutput.outputName) < 0)
            {
                this.componentDefs[inputOutput.outputComponentId].outputs.push(inputOutput.outputName);
            }

            this.componentDefs[inputOutput.inputComponentId] ??=
            {
                inputs: [],
                outputs: [],
            };

            if(this.componentDefs[inputOutput.inputComponentId].inputs.indexOf(inputOutput.inputName) < 0)
            {
                this.componentDefs[inputOutput.inputComponentId].inputs.push(inputOutput.inputName);
            }
        };

        for(const id in relations)
        {
            const def = relations[id];

            for(const inputOutput of def.inputOutputs ?? [])
            {
                addInputOutput(inputOutput);
            }
        }

        for(const id in backwardRelations)
        {
            const def = backwardRelations[id];

            for(const inputOutput of def)
            {
                addInputOutput(inputOutput);
            }
        }
    }

    /**
     * Debugs register component into relations
     * @param id - Id of component that has been registered
     * @param component - Instance of registered component
     */
    public registerComponent(id: string, component: RelationsProcessorComponent): void
    {
        if(this.components[id] && this.components[id].indexOf(component.ɵɵRelationsComponentId ?? '') >= 0)
        {
            this.logger?.warn('RelationsDebugger: component "{@id}" has already been registered', `${id}--${component.ɵɵRelationsComponentId}`);

            return;
        }

        this.components[id] ??= [];
        this.components[id].push(component.ɵɵRelationsComponentId ?? '');

        //update component for debugging info
        if(!Reflect.getOwnPropertyDescriptor(component, COMPONENT_DEBUGGER_PROPERTY))
        {
            Reflect.defineProperty(component,
                                   COMPONENT_DEBUGGER_PROPERTY,
                                   {
                                       configurable: true,
                                       enumerable: false,
                                       writable: false,
                                       value: true,
                                   });

            let obj: object|undefined|null = component;
            let property: PropertyDescriptor|undefined|null;

            do
            {
                if((property = Reflect.getOwnPropertyDescriptor(obj, nameof<RelationsProcessorComponent>('relationsOptions'))))
                {
                    break;
                }
            }
            while((obj = Reflect.getPrototypeOf(obj)));

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const $this = this;

            //property exists
            if(property)
            {
                const getter = property.get;
                const setter = property.set;

                if(!getter || !setter)
                {
                    throw new Error('RelationsDebugger: relations options property must have getter and setter!');
                }

                Reflect.defineProperty(component,
                                       nameof<RelationsProcessorComponent>('relationsOptions'),
                                       {
                                           configurable: true,
                                           enumerable: false,
                                           get: function()
                                           {
                                               return getter.call(this);
                                           },
                                           set: function(value)
                                           {
                                               setter.call(this, value);

                                               $this.readComponentState(id);
                                               $this.setComponentRelationsOptions(id, value);
                                           }
                                       });
            }
            else
            {
                Reflect.defineProperty(component,
                                       nameof<RelationsProcessorComponent>('relationsOptions'),
                                       {
                                           configurable: true,
                                           enumerable: false,
                                           get: function()
                                           {
                                               return this['ɵrelationsOptions'];
                                           },
                                           set: function(value)
                                           {
                                               this['ɵrelationsOptions'] = value;

                                               $this.readComponentState(id);
                                               $this.setComponentRelationsOptions(id, value);
                                           }
                                       });
            }
        }

        this.steps.push(
        {
            timestamp: Date.now(),
            componentRegistration:
            {
                componentId: id,
                componentInternalId: component.ɵɵRelationsComponentId ?? '',
            },
            componentState: null,
            componentUnregistration: null,
            dataTransfer: null,
            componentRelationsOptions: null,
            previousStep: this.getLastStep(),
        });
    }

    /**
     * Debugs unregister component from relations
     * @param id - Id of component that has been unregistered
     * @param component - Instance of unregistered component
     */
    public unregisterComponent(id: string, component: RelationsProcessorComponent): void
    {
        let index: number;

        if(!this.components[id] || (index = this.components[id].indexOf(component.ɵɵRelationsComponentId ?? '')) < 0)
        {
            this.logger?.warn('RelationsDebugger: component "{@id}" does not exists!', `${id}--${component.ɵɵRelationsComponentId}`);

            return;
        }

        this.components[id].splice(index, 1);

        if(!this.components[id].length)
        {
            delete this.components[id];
        }

        //update component for debugging info
        if(Reflect.getOwnPropertyDescriptor(component, COMPONENT_DEBUGGER_PROPERTY))
        {
            Reflect.deleteProperty(component, COMPONENT_DEBUGGER_PROPERTY);
            Reflect.deleteProperty(component, nameof<RelationsProcessorComponent>('relationsOptions'));
        }

        this.steps.push(
        {
            timestamp: Date.now(),
            componentRegistration: null,
            componentState: null,
            componentUnregistration: 
            {
                componentId: id,
                componentInternalId: component.ɵɵRelationsComponentId ?? '',
            },
            dataTransfer: null,
            componentRelationsOptions: null,
            previousStep: this.getLastStep(),
        });
    }

    /**
     * Debug transfer data
     * @param transfer - Transfer that will handle transfering data
     * @param options - Options for storing debug information for data transfer
     */
    public transferData(transfer: RelationsDataTransferInstructionImpl&Partial<RelationsDataTransferIdDebugInfo>, options: RelationsDataTransferDebugInfo): void
    {
        transfer.ɵuniqueId ??= generateId(16);

        const applyChangesOriginal = transfer.applyChanges;

        transfer.applyChanges = (() =>
        {
            applyChangesOriginal.call(transfer);

            this.steps.push(
            {
                timestamp: Date.now(),
                componentRegistration: null,
                componentState: null,
                componentUnregistration: null,
                dataTransfer:
                {
                    change: transfer.changes[options.inputName],
                    inputComponentId: options.inputComponentId,
                    inputName: options.inputName,
                    outputComponentId: options.outputComponentId,
                    outputName: options.outputName,
                    scope: options.scope,
                    ɵuniqueId: transfer.ɵuniqueId ?? '',
                },
                componentRelationsOptions: null,
                previousStep: this.getLastStep(),
            });

            this.readComponentState(options.inputComponentId);
            this.readComponentState(options.outputComponentId);

            const step = this.getLastStep();

            if(!step)
            {
                throw Error('RelationsDebugger: no step available!');
            }

            if(step.componentState)
            {
                for(const comp of step.componentState[options.inputComponentId])
                {
                    comp.inputs[options.inputName] = step.dataTransfer?.change.currentValue;
                }
            }
        }).bind(transfer);
    }

    /**
     * Gets component state
     * @param id - Id of component whose state is going to be read
     */
    public getComponentState(id: string): RelationsComponentStateDebugInfo[]
    {
        let step = this.getLastStep();

        if(!step)
        {
            return [];
        }

        do
        {
            if(step.componentState?.[id])
            {
                return step.componentState[id];
            }
        }
        while((step = step.previousStep));

        return [];
    }

    /**
     * Gets component relations options
     * @param id - Id of component whose relations options are going to be read
     */
    public getComponentRelationsOptions(id: string): unknown
    {
        let step = this.getLastStep();

        if(!step)
        {
            return undefined;
        }

        do
        {
            if(step.componentRelationsOptions?.[id])
            {
                return step.componentRelationsOptions[id];
            }
        }
        while((step = step.previousStep));

        return undefined;
    }

    //######################### protected methods #########################

    /**
     * Reads component state
     * @param id - Id of component which state is read
     */
    protected readComponentState(id: string): void
    {
        let components = this.relationsComponentManager.get(id);

        if(!components)
        {
            this.logger?.warn('RelationsDebugger: unable to find component with id {@id}', id);

            return;
        }

        if(!Array.isArray(components))
        {
            components = [components];
        }

        const state: RelationsComponentStateDebugInfo[] = components.map(itm =>
        {
            const def = this.componentDefs[id];
            const itmDict = itm as unknown as Dictionary;

            const inputs: Dictionary = {};
            const outputs: Dictionary<RelationsOutputDebugInfo> = {};

            if(def)
            {
                for(const input of def.inputs)
                {
                    try
                    {
                        inputs[input] = itmDict[input];
                    }
                    catch(e)
                    {
                        this.logger?.warn(`RelationsDebugger: failed reading input '${input}', {@error}`, e);

                        inputs[input] = undefined;
                    }
                }

                for(const output of def.outputs)
                {
                    try
                    {
                        outputs[output] ??=
                        {
                            assigned: undefined,
                            skipInit: undefined,
                            value: undefined,
                        };

                        outputs[output].value = itmDict[output];
                        outputs[output].assigned = itmDict[`${output}Assigned`] as boolean|undefined;
                        outputs[output].skipInit = itmDict[`${output}SkipInit`] as boolean|undefined;
                    }
                    catch(e)
                    {
                        this.logger?.warn(`RelationsDebugger: failed reading output '${output}', {@error}`, e);

                        outputs[output] =
                        {
                            assigned: undefined,
                            skipInit: undefined,
                            value: undefined,
                        };
                    }
                }
            }

            return {
                componentId: id,
                componentInternalId: itm.ɵɵRelationsComponentId ?? '',
                inputs,
                outputs,
            };
        });

        const step = this.getLastStep();

        if(!step)
        {
            throw Error('RelationsDebugger: no step available!');
        }

        step.componentState ??= {};
        step.componentState[id] = state;
    }

    /**
     * Sets component relations options
     * @param id - Id of component which state is read
     * @param relationsOptions - Instance of relations options to be set
     */
    protected setComponentRelationsOptions(id: string, relationsOptions: unknown): void
    {
        const step = this.getLastStep();

        if(!step)
        {
            throw Error('RelationsDebugger: no step available!');
        }

        step.componentRelationsOptions ??= {};
        step.componentRelationsOptions[id] = relationsOptions;
    }

    /**
     * Gets last step
     */
    protected getLastStep(): RelationsStepDebugInfo|undefined|null
    {
        return this.steps.length > 0 ? this.steps[this.steps.length - 1] : null;
    }
}
