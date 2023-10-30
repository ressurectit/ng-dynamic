import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, Optional, OnDestroy, Input, HostBinding, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {PackageManager} from '@anglr/dynamic';
import {FirstUppercaseLocalizeSAPipe, Logger, LOGGER} from '@anglr/common';
import {Subscription} from 'rxjs';

import {RelationsNodeManager} from '../../../services';
import {NodesPaletteItem} from '../nodesPalette.interface';

/**
 * Component displaying nodes palette item
 */
@Component(
{
    selector: 'nodes-palette-item',
    templateUrl: 'nodesPaletteItem.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesPaletteItemSAComponent implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Indication whether node is already used
     */
    @HostBinding('class.used')
    protected used: boolean = false;

    //######################### public properties - inputs #########################

    /**
     * Nodes palette item
     */
    @Input()
    public data!: NodesPaletteItem;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected packageManager: PackageManager,
                protected _metadataManager: RelationsNodeManager,
                @Optional() protected _cdkDrag: CdkDrag,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        for (const nodeId in this._metadataManager.nodes)
        {
            if (this.data?.itemSource?.name === nodeId)
            {
                this._setUsed(true);
                break;
            }
        }

        //TODO initsubscription add used change
        this.initSubscriptions.add(this._metadataManager.nodeRegisterChange.subscribe(registeredNode => 
        {
            if (registeredNode.id === this.data?.itemSource?.name)
            {
                this._setUsed(true);
            }
        }));
        this.initSubscriptions.add(this._metadataManager.nodeUnregisterChange.subscribe(unregisteredNode => 
        {
            if (unregisteredNode.id === this.data?.itemSource?.name)
            {
                this._setUsed(false);
            }
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Sets used indication for node
     * @param used 
     */
    protected _setUsed(used: boolean): void
    {
        this.used = used;

        if (this._cdkDrag)
        {
            this._cdkDrag.disabled = used;
        }

        this._changeDetector.markForCheck();
    }

    /**
     * Focus to relations node
     * @param item 
     * @returns 
     */
    @HostListener('dblclick')
    protected focusNode(): void
    {
        if (!this.used ||
            !this.data?.metadata?.singleton)
        {
            return;
        }

        this._metadataManager.setActiveNode(this.data?.itemSource?.name);
    }
}