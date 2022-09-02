import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {RelationsComponent} from '../../interfaces';

/**
 * Manager used for managing all components used in relations
 */
@Injectable()
export class RelationsComponentManager implements OnDestroy
{
    //######################### protected properties #########################

    /**
     * Registered components
     */
    protected components: Dictionary<RelationsComponent> = {};

    /**
     * Object storing all scopes and their managers
     */
    protected scopes: Dictionary<RelationsComponentManager[]> = {};

    /**
     * Instance of parent relations component manager
     */
    protected parent: RelationsComponentManager|null = null;

    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }

    //######################### public methods #########################

    /**
     * Registers newly created component
     * @param id - Id of component to be registered
     * @param component - Instance of registered component
     */
    public registerComponent(id: string, component: RelationsComponent): void
    {
        if(this.components[id])
        {
            this.logger?.warn(`RelationsComponentManager: Component with id '${id}' is already registered, provide unique id.`);

            return;
        }

        this.components[id] = component;
    }

    /**
     * Unregisters component
     * @param id - Id of component to be unregistered
     */
    public unregisterComponent(id: string): void
    {
        if(!this.components[id])
        {
            this.logger?.warn(`RelationsComponentManager: Component with id '${id}' has already been unregistered.`);

            return;
        }

        delete this.components[id];
    }

    /**
     * Gets instance of component or array of component instances or null
     * @param id - Unique identification of component, or components
     */
    public get(id: string): RelationsComponent[]|RelationsComponent|null
    {
        //TODO: optimize search of scopes

        const component = this.components[id];

        if(component)
        {
            return component;
        }

        for(const scopeId in this.scopes)
        {
            const scope = this.scopes[scopeId];

            if(!scope[0])
            {
                return null;
            }

            const scopedComponent = scope[0].get(id);

            if(scopedComponent)
            {
                return scopedComponent;
            }
        }

        return this.parent?.components[id] ?? null;
    }

    /**
     * Opens new scope for relations component manager
     * @param id - Id of newly created scope
     */
    public openScope(id: string): RelationsComponentManager
    {
        this.scopes[id] ??= [];
        const scope = new RelationsComponentManager(this.logger);
        scope.parent = this;
        this.scopes[id].push(scope);

        return scope;
    }

    /**
     * Destroyes scope by id
     * @param id - Id of scope to be destroyed
     */
    public destroyScope(id: string): void
    {
        const scope = this.scopes[id];

        if(scope)
        {
            for(const manager of scope)
            {
                manager.ngOnDestroy();
            }
        }

        delete this.scopes[id];
    }
}