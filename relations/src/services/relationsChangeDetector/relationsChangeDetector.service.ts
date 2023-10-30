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
     * Array of mark for check ids that were called before initialization
     */
    protected markedBeforeInit: MarkForCheckId[] = [];

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
     * Objects storing components and theirs outputs and related output input relations
     */
    protected ɵoutputsComponents: Dictionary<Dictionary<RelationsProcessorInputOutputData[]>> = {};

    /**
     * Instance of parent relations change detector
     */
    protected parent: RelationsChangeDetector|undefined|null = inject(RelationsChangeDetector, {optional: true, skipSelf: true,});

    /**
     * Objects storing components and theirs outputs and related output input relations
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
     * Array of changes that should be checked and transfered in first run
     */
    protected firstRunChanges: RelationsChange[] = [];

    /**
     * Array of changes that should be checked and transfered in second run
     */
    protected secondRunChanges: RelationsChange[] = [];

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

        this.logger.debug('RelationsChangeDetector: marking for check {{@id}}', {id: {componentId, outputName: id.outputName}});

        const relationDefs = this.outputsComponents[componentId]?.[id.outputName] ?? [];
        const changes = this.checkRunning && !this.options.detectionInSingleRun ? this.secondRunChanges : this.firstRunChanges;

        //TODO: think of better solution, cache mark when not initialized
        if(!relationDefs.length)
        {
            this.markedBeforeInit.push(id);

            return;
        }

        for(const relationDef of relationDefs)
        {
            const relation = changes.find(itm => itm.id == relationDef.inputComponentId);

            //not exists yet
            if(!relation)
            {
                changes.push(
                {
                    id: relationDef.inputComponentId,
                    inputs: [relationDef.inputName],
                });

                continue;
            }

            //already exists
            if(relation.inputs.indexOf(relationDef.inputName) >= 0)
            {
                continue;
            }

            relation.inputs.push(relationDef.inputName);
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
        this.logger.debug('RelationsChangeDetector: initializing {{@relations}}', {relations: relations});

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

        const ids = [...this.markedBeforeInit];
        this.markedBeforeInit = [];

        for(const markForCheckId of ids)
        {
            this.markForCheck(markForCheckId);
        }
    }

    //######################### protected methods #########################

    /**
     * Runs check for marked components
     */
    @BindThis
    protected runCheck(): void
    {
        this.logger.debug('RelationsChangeDetector: running check');

        this.checkRunning = true;

        for(const change of this.firstRunChanges)
        {
            const transfer = this.relationsProcessor.transferInputsData(change.id, true, change.inputs);

            transfer.applyChanges();
        }

        if(this.options.detectionInSingleRun)
        {
            this.firstRunChanges = [];
        }
        else
        {
            this.firstRunChanges = this.secondRunChanges;
            this.secondRunChanges = [];
        }

        this.checkRunning = false;
        this.timeout = null;
    }
}
