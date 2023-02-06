import {Component, ChangeDetectionStrategy, inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyRenderSADirective, PositionModule, PositionPlacement, TooltipModule, TooltipOptions} from '@anglr/common';
import {RelationsComponentEndpoints, RelationsComponentStateDebugInfo, RelationsDebugger, RelationsStepDebugInfo} from '@anglr/dynamic/relations';
import {RelationsNode, RelationsNodeBase} from '@anglr/dynamic/relations-editor';
import {Subscription} from 'rxjs';

import {JsonFormattedSAPipe} from '../../../pipes';
import {RelationNodeInputDebugSAComponent, RelationNodeOutputDebugSAComponent} from '../../../components';

/**
 * Relations node component for debugger node
 */
@Component(
{
    selector: 'debugger-node',
    templateUrl: 'debuggerNode.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        TooltipModule,
        RelationNodeInputDebugSAComponent,
        RelationNodeOutputDebugSAComponent,
        JsonFormattedSAPipe,
        PositionModule,
        BodyRenderSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebuggerNodeSAComponent extends RelationsNodeBase implements RelationsNode, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Instance of relations debugger
     */
    protected relationsDebugger: RelationsDebugger = inject(RelationsDebugger);

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether was this relations component already registered
     */
    protected registered: boolean = false;

    /**
     * Name of input that is currently part of data transfer
     */
    protected transferInput: string|undefined|null;

    /**
     * Name of output that is currently part of data transfer
     */
    protected transferOutput: string|undefined|null;

    /**
     * Instance of component definition
     */
    protected componentDef: RelationsComponentEndpoints|undefined|null;

    /**
     * Array of component ids
     */
    protected components: string[] = [];

    /**
     * Information about currently displayed step
     */
    protected step: RelationsStepDebugInfo|undefined|null;

    /**
     * Current state of all components
     */
    protected state: RelationsComponentStateDebugInfo[] = [];

    /**
     * Tooltip options
     */
    protected tooltipOptions: Partial<TooltipOptions> =
    {
        position:
        {
            placement: PositionPlacement.TopStart,
            offset: 'None',
        },
        allowSelection: true,
        tooltipCssClass: 'relations-debugger-tooltip',
    };

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override ngOnDestroy(): void
    {
        super.ngOnDestroy();

        this.initSubscriptions.unsubscribe();
    }

    /**
     * @inheritdoc
     */
    public override initialize(): void
    {
        this.initSubscriptions.add(this.relationsDebugger.stepChange.subscribe(() => this.readNodesData()));
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override metadataSet(): void
    {
        if(!this.metadata)
        {
            return;
        }

        this.componentDef = this.relationsDebugger.getComponentDef(this.metadata.id);
        this.readNodesData();
    }

    //######################### protected methods #########################

    /**
     * Reads node data for current step
     */
    protected readNodesData(): void
    {
        if(!this.metadata)
        {
            return;
        }

        const components = this.relationsDebugger.getCurrentComponents();

        //unregistered
        if(!components[this.metadata.id])
        {
            this.element.nativeElement.classList.add('unregistered');
            this.registered = false;

            return;
        }

        this.registered = true;
        this.element.nativeElement.classList.remove('unregistered');
        this.step = this.relationsDebugger.getCurrentStep();

        //registration step
        if(this.step?.componentRegistration?.componentId == this.metadata.id)
        {
            this.element.nativeElement.classList.add('registration-step');
        }
        else
        {
            this.element.nativeElement.classList.remove('registration-step');
        }

        //input transfer data step
        if(this.step?.dataTransfer?.inputComponentId == this.metadata.id)
        {
            this.transferInput = this.step.dataTransfer.inputName;
        }
        else
        {
            this.transferInput = null;
        }

        //output transfer data step
        if(this.step?.dataTransfer?.outputComponentId == this.metadata.id)
        {
            this.transferOutput = this.step.dataTransfer.outputName;
        }
        else
        {
            this.transferOutput = null;
        }

        this.state = this.relationsDebugger.getComponentState(this.metadata.id);
        this.components = components[this.metadata.id] ?? [];
    }
}