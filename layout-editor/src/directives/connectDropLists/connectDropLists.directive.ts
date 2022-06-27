import {Directive, OnDestroy, OnInit} from '@angular/core';
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
    /**
     * Subscriptions created during initialization
     */
    private _initSubscriptions: Subscription = new Subscription();

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
        const flatTree = this._manager.flatTree.map(itm => itm.component.id).reverse();
        const connectedTo = flatTree.filter(itm => itm != this._cdkDropList.id);

        this._cdkDropList.connectedTo = connectedTo;
    }
}