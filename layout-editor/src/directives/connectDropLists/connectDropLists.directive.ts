import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {LayoutEditorMetadataManager} from '../../services';

/**
 * Directive that connects all droplists in tree
 */
@Directive(
{
    selector: '[cdkDropList][connectDropLists]',
    exportAs: 'connectDropLists',
    standalone: true,
})
export class ConnectDropListsSADirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################
    
    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Prefix used for connected droplists group
     */
    protected _connectDropListsPrefix: string = '';

    //######################### public properties - inputs and outputs #########################

    /**
     * Prefix used for connected droplists group
     */
    @Input()
    public set connectDropListsPrefix(prefix: string)
    {
        this._connectDropListsPrefix = prefix;
        this._setConnectedTo();
    }
    public get connectDropListsPrefix(): string
    {
        return this._connectDropListsPrefix ?? '';
    }

    //######################### constructor #########################
    constructor(protected _cdkDropList: CdkDropList,
                protected _manager: LayoutEditorMetadataManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this._manager.layoutChange.pipe(debounceTime(12)).subscribe(() => this._setConnectedTo()));

        this._setConnectedTo();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Sets connectedTo to CdkDropList
     */
    protected _setConnectedTo(): void
    {
        const flatTree = this._manager
            .flatTree
            .filter(itm => itm.component.canDropFn())
            .map(itm => this.connectDropListsPrefix + itm.component.id).reverse();

        const connectedTo = flatTree.filter(itm => itm != this._cdkDropList.id);

        this._cdkDropList.connectedTo = connectedTo;
    }
}