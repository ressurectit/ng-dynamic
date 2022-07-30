import {Inject, Injectable, OnDestroy, Type} from '@angular/core';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponentDef, LAYOUT_COMPONENTS_LOADER} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutManager} from '../layoutManager/layoutManager.service';

/**
 * Layout component register type definition
 */
export interface LayoutComponentsRegisterType
{
    /**
     * Type that represents layout component
     */
    type: Type<any>|undefined|null;

    /**
     * Display name of layout component
     */
    displayName: string|undefined|null;
}

/**
 * Register for layout components that are part of relations
 */
@Injectable()
export class LayoutComponentsRegister implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Object storing defined types
     */
    protected _definedTypes: Dictionary<LayoutComponentsRegisterType> = {};

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
                @Inject(LAYOUT_COMPONENTS_LOADER) protected _loader: DynamicItemLoader<LayoutComponentDef>,
                protected _iteratorSvc: LayoutComponentsIteratorService)
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

        return this._definedTypes[name]?.type ?? null;
    }

    /**
     * Gets display name of type by its name
     * @param name - Name of type that display name should be obtained
     */
    public async getDisplayName(name: string): Promise<string|undefined>
    {
        await (this._initPromise ??= this._initializeTypes());

        return this._definedTypes[name]?.displayName ?? undefined;
    }

    //######################### protected method #########################

    /**
     * Initialize layout types
     */
    protected async _initializeTypes(): Promise<void>
    {
        this._definedTypes = {};

        if(!this._layoutManager.layout)
        {
            return;
        }

        const layoutComponents = this._iteratorSvc.getIteratorFor(this._layoutManager.layout);

        for await(const component of layoutComponents)
        {
            const type = await this._loader.loadItem(component.metadata);

            if(!type)
            {
                continue;
            }

            this._definedTypes[component.metadata.id] = 
            {
                type: type.data,
                displayName: component.metadata.displayName,
            };
        }
    }
}