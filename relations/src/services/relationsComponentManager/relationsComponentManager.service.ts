import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, generateId} from '@jscrpt/common';

import {RelationsComponent} from '../../interfaces';
import {RelationsProcessorComponent} from '../../misc/types';

/**
 * Manager used for managing all components used in relations
 */
@Injectable()
export class RelationsComponentManager implements OnDestroy
{
    //######################### protected properties #########################

    /**
     * Id of current scope
     */
    protected scopeId: string|null = null;

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

    /**
     * Cache containing children scoped components
     */
    protected childrenCache: Dictionary<RelationsComponent[]> = {};

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
        //removes nested scopes first
        if(this.scopes)
        {
            for(const scopeId in this.scopes)
            {
                const scope = this.scopes[scopeId];

                if(scope)
                {
                    for(const manager of scope)
                    {
                        manager.ngOnDestroy();
                    }
                }

                delete this.scopes[scopeId];
            }
            
        }

        for(const componentId in this.components)
        {
            this.removeCacheFromHierarchy(componentId);
        }

        //removes self from parent scopes
        if(this.parent && this.scopeId)
        {
            const scope = this.parent.scopes[this.scopeId];

            if(scope)
            {
                const index = scope.indexOf(this);

                if(index >= 0)
                {
                    scope.splice(index, 1);
                }
            }
        }
    }

    //######################### public methods #########################

    /**
     * Registers newly created component
     * @param id - Id of component to be registered
     * @param component - Instance of registered component
     */
    public registerComponent(id: string, component: RelationsProcessorComponent): void
    {
        if(this.components[id])
        {
            this.logger?.warn(`RelationsComponentManager: Component with id '${id}' is already registered, provide unique id.`);

            return;
        }

        component.ɵɵRelationsComponentId ??= generateId(12);
        this.removeCacheFromHierarchy(id);
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

        this.removeCacheFromHierarchy(id);
        delete this.components[id];
    }

    /**
     * Gets instance of component or array of component instances or null
     * @param id - Unique identification of component, or components
     */
    public get(id: string): RelationsProcessorComponent[]|RelationsProcessorComponent|null
    {
        const component = this.components[id];

        if(component)
        {
            return component;
        }

        if(this.childrenCache[id])
        {
            return this.childrenCache[id];
        }

        const components = this.getChildrenComponents(id);

        if(components)
        {
            return components;
        }

        return this.getParentComponents(id);
    }

    /**
     * Gets id of relations component, for this manager
     * @param component - Component which id should be found
     */
    public getId(component: RelationsComponent): string|null
    {
        for(const id in this.components)
        {
            const comp = this.components[id];

            if(comp === component)
            {
                return id;
            }
        }

        return null;
    }

    /**
     * Opens new scope for relations component manager
     * @param id - Id of newly created scope
     */
    public openScope(id: string): RelationsComponentManager
    {
        this.scopes[id] ??= [];
        const scope = new RelationsComponentManager(this.logger);
        scope.scopeId = id;
        scope.parent = this;
        this.scopes[id].push(scope);

        return scope;
    }

    //######################### protected methods #########################

    /**
     * Removes cached components from hierarchy
     * @param id - Id of component which will be removed from cache
     */
    protected removeCacheFromHierarchy(id: string): void
    {
        //no parent or parent cache does not contains id
        if(!this.parent || !this.parent.childrenCache[id])
        {
            return;
        }

        delete this.parent.childrenCache[id];
        this.parent.removeCacheFromHierarchy(id);
    }

    /**
     * Gets children components when scopes are used
     * @param id - Id of components to be get
     */
    protected getChildrenComponents(id: string): RelationsComponent[]|null
    {
        const getFromScope = (scopeId: string) =>
        {
            const scope = this.scopes[scopeId];
            const result: RelationsComponent[] = [];

            for(const mngr of scope)
            {
                const component = mngr.components[id];

                if(component)
                {
                    result.push(component);

                    continue;
                }

                const components = mngr.getChildrenComponents(id);

                if(Array.isArray(components))
                {
                    for(const cmp of components)
                    {
                        result.push(cmp);
                    }

                    continue;
                }

                return null;
            }

            if(result.length)
            {
                return result;
            }

            return null;
        };


        for(const scopeId in this.scopes)
        {
            const result = getFromScope(scopeId);

            if(result)
            {
                this.childrenCache[id] = result;

                return result;
            }
        }

        return null;
    }

    /**
     * Gets parent components when scopes are used
     * @param id - Id of component to be get
     */
    protected getParentComponents(id: string): RelationsComponent|null
    {
        if(!this.parent)
        {
            return null;
        }

        const component = this.parent.components[id] ?? null;

        if(component)
        {
            return component;
        }

        return this.parent.getParentComponents(id);
    }
}