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
    //######################### protected fields #########################

    /**
     * Registered components
     */
    protected _components: Dictionary<RelationsComponent> = {};

    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
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
        if(this._components[id])
        {
            this._logger?.error(`RelationsComponentManager: Component with id '${id}' is already registered, provide unique id.`);

            return;
        }

        this._components[id] = component;
    }

    /**
     * Unregisters component
     * @param id - Id of component to be unregistered
     */
    public unregisterComponent(id: string): void
    {
        if(!this._components[id])
        {
            this._logger?.warn(`RelationsComponentManager: Component with id '${id}' has already been unregistered.`);

            return;
        }

        delete this._components[id];
    }

    /**
     * Gets instance of component or array of component instances or null
     * @param id - Unique identification of component, or components
     */
    public get(id: string): RelationsComponent[]|RelationsComponent|null
    {
        return this._components[id];
    }
}