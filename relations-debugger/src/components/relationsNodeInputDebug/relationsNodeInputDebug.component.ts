import {Component, ChangeDetectionStrategy, ExistingProvider, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NodeRelationPath, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {NodeRelationPathDebug} from '../../misc/nodeRelationPathDebug';

/**
 * Component used to display relation node input for debugging
 */
@Component(
{
    selector: 'relation-node-input-debug',
    template: '',
    providers:
    [
        <ExistingProvider>
        {
            provide: RelationNodeInputComponent,
            useExisting: forwardRef(() => RelationNodeInputDebugComponent),
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeInputDebugComponent extends RelationNodeInputComponent implements OnChanges
{
    //######################### protected properties #########################

    /**
     * Debug relation instance
     */
    protected get relationDebug(): NodeRelationPathDebug|undefined|null
    {
        return this.relation as NodeRelationPathDebug;
    }

    //######################### public properties #########################

    /**
     * Gets native html element for node
     */
    public get htmlElement(): HTMLElement
    {
        return this.element.nativeElement;
    }

    //######################### public properties - inputs #########################

    /**
     * Indication whether highlight relations connected to this input
     */
    @Input()
    public transferHighlight: boolean = false;

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<RelationNodeInputDebugComponent>('transferHighlight') in changes)
        {
            if(this.transferHighlight)
            {
                this.relation?.highlight();
                this.relationDebug?.createTransferOverlay();
            }
            else
            {
                this.relation?.cancelHighlight();
                this.relationDebug?.destroyTransferOverlay();
            }
        }
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override addRelation(relation: NodeRelationPath): boolean
    {
        const result = super.addRelation(relation);

        if(this.transferHighlight)
        {
            this.relation?.highlight();
            this.relationDebug?.createTransferOverlay();
        }
        else
        {
            this.relation?.cancelHighlight();
            this.relationDebug?.destroyTransferOverlay();
        }

        return result;
    }
}