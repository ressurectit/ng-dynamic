import {Component, ChangeDetectionStrategy, EventEmitter, Output, ClassProvider, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit} from '@angular/core';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER} from '@anglr/dynamic/relations-editor';
import {RelationsDebugger, RelationsStepDebugInfo} from '@anglr/dynamic/relations';
import {RelationsNodeManager} from '@anglr/dynamic/relations-editor';
import {isPresent, nameof} from '@jscrpt/common';

import {MetadataHistoryManagerDebug} from '../../services';
import {StepNamePipe} from '../../pipes';
import {RelationsCanvasDebugComponent} from '../relationsCanvasDebug/relationsCanvasDebug.component';

/**
 * Component used for visualization of relations debugger data
 */
@Component(
{
    selector: 'relations-debugger-visualizer',
    templateUrl: 'relationsDebuggerVisualizer.component.html',
    imports:
    [
        RelationsCanvasDebugComponent,
        StepNamePipe,
    ],
    providers:
    [
        RelationsNodeManager,
        <ClassProvider>
        {
            provide: RELATIONS_HISTORY_MANAGER,
            useClass: MetadataHistoryManagerDebug,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsDebuggerVisualizerComponent implements OnInit, OnChanges
{
    //######################### protected properties #########################

    /**
     * Interval of running debugging
     */
    protected interval: number|undefined|null;

    //######################### protected properties - template bindings #########################

    /**
     * Playing through debugging steps
     */
    protected playing: boolean = false;

    /**
     * Definition of nodes that should be rendered
     */
    protected nodeDefinitions: RelationsNodeMetadata[] = [];

    /**
     * Currently displayed step
     */
    protected currentStep: RelationsStepDebugInfo|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Delay between steps during automatic play
     */
    @Input()
    public playDelay: number = 1500;

    /**
     * Definition of relations and their nodes, used for rendering canvas
     */
    @Input()
    public relationsDefinition: RelationsNodeMetadata[] = [];

    //######################### public properties - outputs #########################

    /**
     * Occurs when user is trying to close visualizer
     */
    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    //######################### constructor #########################
    constructor(protected relationsDebugger: RelationsDebugger,
                protected changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        const step = this.relationsDebugger.getCurrentStep();

        this.renderStep(step);
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<RelationsDebuggerVisualizerComponent>('relationsDefinition') in changes)
        {
            this.renderStep(this.currentStep);
        }
    }

    //######################### protected methods - template bindings #########################

    /**
     * Toggles play mode 
     */
    protected togglePlay(): void
    {
        this.playing = !this.playing;

        if(isPresent(this.interval))
        {
            clearInterval(this.interval);
            this.interval = null;
        }
        else
        {
            this.interval = setInterval(() =>
            {
                const step = this.relationsDebugger.getNextStep();

                if(!step)
                {
                    this.togglePlay();

                    return;
                }

                this.processStep(step);

                console.log(step, this.relationsDebugger);
            }, this.playDelay) as unknown as number;
        }
    }

    /**
     * Shows next step
     */
    protected nextStep(): void
    {
        const step = this.relationsDebugger.getNextStep();

        this.renderStep(step);
    }

    /**
     * Shows previous step
     */
    protected previousStep(): void
    {
        const step = this.relationsDebugger.getPreviousStep();

        this.renderStep(step);
    }

    /**
     * Shows last step
     */
    protected lastStep(): void
    {
        const step = this.relationsDebugger.getLastStep();

        this.renderStep(step);
    }

    /**
     * Shows first step
     */
    protected firstStep(): void
    {
        const step = this.relationsDebugger.getFirstStep();

        this.renderStep(step);
    }

    //######################### protected methods #########################

    /**
     * Updates current node definition for step
     */
    protected updateNodeDefinitionForStep(): void
    {
        this.nodeDefinitions = this.relationsDefinition
            .map(itm =>
            {
                return {
                    ...itm,
                    package: 'relations-debugger',
                };
            });
    }

    /**
     * Renders current step
     * @param step - Step to be rendered
     */
    protected renderStep(step: RelationsStepDebugInfo|undefined|null): void
    {
        if(!step)
        {
            return;
        }

        this.processStep(step);
    }

    /**
     * Process step
     * @param step - Step to be processed
     */
    protected processStep(step: RelationsStepDebugInfo): void
    {
        this.updateNodeDefinitionForStep();
        this.currentStep = step;

        this.changeDetector.detectChanges();
    }
}