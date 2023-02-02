import {Injectable} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import {RelationsProcessorComponent} from '../../misc/types';
import {RelationsComponentStateDebugInfo, RelationsDataTransferDebugInfo, RelationsDataTransferIdDebugInfo, RelationsStepDebugInfo} from './relationsDebugger.interface';
import {RelationsDataTransferInstructionImpl} from '../relationsProcessor/relationsDataTransferInstruction';
import {RelationsProcessorComponentData, RelationsProcessorInputOutputData} from '../relationsProcessor/relationsProcessor.interface';

/**
 * Service used for debugging relations, use actual implementation instead of this
 */
@Injectable()
export abstract class RelationsDebugger
{
    //######################### public methods #########################

    /**
     * Initialize debugger with processed relations metadata
     * @param relations - Relations used for initialization
     * @param backwardRelations - Backward relations used for initialization
     */
    public abstract initialize(relations: Dictionary<RelationsProcessorComponentData>, backwardRelations: Dictionary<RelationsProcessorInputOutputData[]>): void;

    /**
     * Debugs register component into relations
     * @param id - Id of component that has been registered
     * @param component - Instance of registered component
     */
    public abstract registerComponent(id: string, component: RelationsProcessorComponent): void;

    /**
     * Debugs unregister component from relations
     * @param id - Id of component that has been unregistered
     * @param component - Instance of unregistered component
     */
    public abstract unregisterComponent(id: string, component: RelationsProcessorComponent): void;

    /**
     * Debug transfer data
     * @param transfer - Transfer that will handle transfering data
     * @param options - Options for storing debug information for data transfer
     */
    public abstract transferData(transfer: RelationsDataTransferInstructionImpl&Partial<RelationsDataTransferIdDebugInfo>, options: RelationsDataTransferDebugInfo): void;

    /**
     * Gets currently registered components
     */
    public abstract getCurrentComponents(): Dictionary<string[]>;

    /**
     * Gets component state
     * @param id - Id of component whose state is going to be read
     */
    public abstract getComponentState(id: string): RelationsComponentStateDebugInfo[];

    /**
     * Gets component relations options
     * @param id - Id of component whose relations options are going to be read
     */
    public abstract getComponentRelationsOptions(id: string): unknown;

    /**
     * Gets last step or null if is already on last step
     */
    public abstract getLastStep(): RelationsStepDebugInfo|null;

    /**
     * Gets first step or null if is already on first step
     */
    public abstract getFirstStep(): RelationsStepDebugInfo|null;

    /**
     * Gets next step or null if is already on last step
     */
    public abstract getNextStep(): RelationsStepDebugInfo|null;

    /**
     * Gets previous step or null if is already on first step
     */
    public abstract getPreviousStep(): RelationsStepDebugInfo|null;

    /**
     * Gets current step or null if there are no steps
     */
    public abstract getCurrentStep(): RelationsStepDebugInfo|null;

    /**
     * Clears all recorded steps
     */
    public abstract clearSteps(): void;
}
