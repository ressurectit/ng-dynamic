import {inject, Inject, Injectable, Injector, Optional} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {BindThis, Dictionary, isEmptyObject, isString} from '@jscrpt/common';

import {RelationsComponentManager} from '../relationsComponentManager/relationsComponentManager.service';
import {RelationsProcessorComponentData, RelationsProcessorInputOutputData} from '../relationsProcessor/relationsProcessor.interface';
import {RelationsProcessor} from '../relationsProcessor/relationsProcessor.service';
import {MarkForCheckId, RelationsChange} from './relationsChangeDetector.interface';
import {RelationsChangeDetectorOptions} from './relationsChangeDetector.options';

/**
 * Change detector for relations, which allows async change detection
 */
@Injectable()
export class RelationsChangeDetector
{
    //######################### protected properties #########################

    /**
     * Instance of relations processor for handling relations
     */
    protected ɵrelationsProcessor: RelationsProcessor|undefined|null;

    /**
     * Gets instance of relations processor for handling relations
     */
    protected get relationsProcessor(): RelationsProcessor
    {
        return (this.ɵrelationsProcessor ??= this.injector.get(RelationsProcessor));
    }

    /**
     * Instance of relations component manager storing registered components
     */
    protected ɵrelationsComponentManager: RelationsComponentManager|undefined|null;

    /**
     * Gets instance of relations component manager storing registered components
     */
    protected get relationsComponentManager(): RelationsComponentManager
    {
        return (this.ɵrelationsComponentManager ??= this.injector.get(RelationsComponentManager));
    }

    /**
     * Objects storing components and theirs outputs and related input components def
     */
    protected ɵoutputsComponents: Dictionary<Dictionary<RelationsProcessorInputOutputData[]>> = {};

    /**
     * Instance of parent relations change detector
     */
    protected parent: RelationsChangeDetector|undefined|null = inject(RelationsChangeDetector, {optional: true, skipSelf: true,});

    /**
     * Objects storing components and theirs outputs and related input components
     */
    protected get outputsComponents(): Dictionary<Dictionary<RelationsProcessorInputOutputData[]>>
    {
        if(isEmptyObject(this.ɵoutputsComponents) && this.parent)
        {
            return this.parent.outputsComponents;
        }

        return this.ɵoutputsComponents;
    }

    /**
     * Options for relations change detector
     */
    protected options: RelationsChangeDetectorOptions;

    /**
     * Identifier of running timeout
     */
    protected timeout: number|undefined|null;

    /**
     * Array of input component ids that should be checked in first run
     */
    protected firstRunIds: RelationsChange[] = [];

    /**
     * Array of input component ids that should be checked in second run
     */
    protected secondRunIds: RelationsChange[] = [];

    /**
     * Indication whether is check running
     */
    protected checkRunning: boolean = false;

    //######################### constructor #########################
    constructor(protected injector: Injector,
                @Inject(LOGGER) protected logger: Logger,
                @Optional() options?: RelationsChangeDetectorOptions,)
    {
        if(!options || !(options instanceof RelationsChangeDetectorOptions))
        {
            options = new RelationsChangeDetectorOptions();
        }

        this.options = options;
    }

    //######################### public methods #########################

    /**
     * Marks input component connected to this for checking
     * @param id - Identification of what should be checked
     */
    public markForCheck(id: MarkForCheckId): void
    {
        const componentId = isString(id.componentId) ? id.componentId : this.relationsComponentManager.getId(id.componentId);

        if(!componentId)
        {
            this.logger.warn('RelationsChangeDetector: Unable to find component!');

            return;
        }

        const inputComponents = this.outputsComponents[componentId]?.[id.outputName] ?? [];
        const ids = this.checkRunning && !this.options.detectionInSingleRun ? this.secondRunIds : this.firstRunIds;

        for(const inputComponent of inputComponents)
        {
            const item = ids.find(itm => itm.id == inputComponent.inputComponentId);

            //not exists yet
            if(!item)
            {
                ids.push(
                {
                    id: inputComponent.inputComponentId,
                    inputs: [inputComponent.inputName],
                });

                continue;
            }

            //already exists
            if(item.inputs.indexOf(inputComponent.inputName) >= 0)
            {
                continue;
            }

            item.inputs.push(inputComponent.inputName);
        }

        //schedule check
        if(!this.timeout)
        {
            this.timeout = setTimeout(this.runCheck, 0) as unknown as number;
        }
    }

    /**
     *
     * @param relations - Object storing current relations
     */
    public initialize(relations: Dictionary<RelationsProcessorComponentData>): void
    {
        this.ɵoutputsComponents = {};

        for(const componentId in relations)
        {
            const relationsDef = relations[componentId];

            this.ɵoutputsComponents[componentId] ??= {};

            if(!relationsDef.inputOutputs)
            {
                continue;
            }

            for(const inputOutput of relationsDef.inputOutputs)
            {
                this.ɵoutputsComponents[componentId][inputOutput.outputName] ??= [];
                this.ɵoutputsComponents[componentId][inputOutput.outputName].push(inputOutput);
            }
        }
    }

    //######################### protected methods #########################

    /**
     * Runs check for marked components
     */
    @BindThis
    protected runCheck(): void
    {
        this.checkRunning = true;

        for(const id of this.firstRunIds)
        {
            const changes = this.relationsProcessor.transferInputsData(id.id, true);
            const allInputs = Object.keys(changes.changes);

            //TODO: maybe move into relations processor
            for(const inputName of allInputs)
            {
                //remove non existing change
                if(!(inputName in id.inputs))
                {
                    delete changes.changes[inputName];
                }
            }
        }

        if(this.options.detectionInSingleRun)
        {
            this.firstRunIds = [];
        }
        else
        {
            this.firstRunIds = this.secondRunIds;
            this.secondRunIds = [];
        }

        this.checkRunning = false;
        this.timeout = null;
    }
}
