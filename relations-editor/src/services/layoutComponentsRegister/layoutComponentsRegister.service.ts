import {Inject, Injectable, OnDestroy, Type} from '@angular/core';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutManager} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {RelationsNodeDef} from '../../misc/types';
import {RELATIONS_NODES_LOADER} from '../../misc/tokens';

/**
 * Register for layout components that are part of relations
 */
@Injectable()
export abstract class LayoutComponentsRegister implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Object storing defined types
     */
    protected _definedTypes: Dictionary<Type<any>> = {};

    /**
     * Initialization promise
     */
    protected _initPromise: Promise<void>|null = null;

    //######################### public properties #########################

    /**
     * Gets available types that are used as layout components
     */
    public get types(): Promise<string[]>
    {
        this._initPromise ??= this._initializeTypes();

        return this._initPromise.then(() =>
        {
            return Object.keys(this._definedTypes);
        });
    }

    //######################### constructor #########################
    constructor(protected _layoutManager: LayoutManager,
                protected _iteratorSvc: LayoutComponentsIteratorService,
                @Inject(RELATIONS_NODES_LOADER) protected _loader: DynamicItemLoader<RelationsNodeDef>,)
    {
        this._initSubscriptions.add(this._layoutManager.layoutChange.subscribe(() => this._initPromise = null));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Gets type by its name
     * @param name - Name of type that should be obtained
     */
    public async getType(name: string): Promise<Type<any>|null>
    {
        await (this._initPromise ??= this._initializeTypes());

        return this._definedTypes[name] ?? null;
    }

    //######################### protected method #########################

    /**
     * Initialize layout types
     */
    protected async _initializeTypes(): Promise<void>
    {
        if(!this._layoutManager.layout)
        {
            return;
        }

        const layoutComponents = this._iteratorSvc.getIteratorFor(this._layoutManager.layout);

        for await(const component of layoutComponents)
        {


            // this._definedTypes[component.metadata.id] = 
        }
    }
}