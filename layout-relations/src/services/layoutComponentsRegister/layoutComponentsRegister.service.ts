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
    type: Type<any>;

    /**
     * Display name of layout component
     */
    displayName: string|undefined|null;

    /**
     * Name of layout component
     */
    name: string;

    /**
     * Scope of layout component
     */
    scope: string|undefined;
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
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Object storing defined types
     */
    protected definedTypes: Dictionary<LayoutComponentsRegisterType> = {};

    /**
     * Initialization promise
     */
    protected initPromise: Promise<void>|null = null;

    //######################### public properties #########################

    /**
     * Gets available types that are used as layout components
     */
    public get types(): Promise<string[]>
    {
        this.initPromise ??= this.initializeTypes();

        return this.initPromise.then(() =>
        {
            return Object.keys(this.definedTypes);
        });
    }

    //######################### constructor #########################
    constructor(protected layoutManager: LayoutManager,
                @Inject(LAYOUT_COMPONENTS_LOADER) protected loader: DynamicItemLoader<LayoutComponentDef>,
                protected iteratorSvc: LayoutComponentsIteratorService)
    {
        this.initSubscriptions.add(this.layoutManager.layoutChange.subscribe(() => this.initPromise = null));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### public methods #########################

    /**
     * Gets type by its name
     * @param name - Name of type that should be obtained
     */
    public async getType(name: string): Promise<Type<any>|null>
    {
        await (this.initPromise ??= this.initializeTypes());

        return this.definedTypes[name]?.type ?? null;
    }

    /**
     * Gets display name of type by its name
     * @param name - Name of type that display name should be obtained
     */
    public async getDisplayName(name: string): Promise<string|undefined>
    {
        await (this.initPromise ??= this.initializeTypes());

        return this.definedTypes[name]?.displayName ?? undefined;
    }

    /**
     * Gets scope of type by its name
     * @param name - Name of type that scope should be obtained
     */
    public async getScope(name: string): Promise<string|undefined>
    {
        await (this.initPromise ??= this.initializeTypes());

        return this.definedTypes[name]?.scope;
    }

    /**
     * Gets component name of type byt its name
     * @param name - Name of type that component name should be obtained
     */
    public async getComponentName(name: string): Promise<string|null>
    {
        await (this.initPromise ??= this.initializeTypes());

        return this.definedTypes[name]?.name ?? null;
    }

    //######################### protected method #########################

    /**
     * Initialize layout types
     */
    protected async initializeTypes(): Promise<void>
    {
        this.definedTypes = {};

        if(!this.layoutManager.layout)
        {
            return;
        }

        const layoutComponents = this.iteratorSvc.getIteratorFor(this.layoutManager.layout);

        for await(const component of layoutComponents)
        {
            const type = await this.loader.loadItem(component.metadata);

            if(!type)
            {
                continue;
            }

            this.definedTypes[component.metadata.id] = 
            {
                type: type.data,
                displayName: component.metadata.displayName,
                name: component.metadata.name,
                scope: component.metadata.scope,
            };
        }
    }
}