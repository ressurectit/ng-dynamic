import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary, isBlank, isEmptyObject, isPresent} from '@jscrpt/common';

import type {LayoutDesignerSAComponent} from '../../components';
import {LayoutComponentMetadata} from '../../../../layout/src';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutMetadataManager
{
    //######################### protected fields #########################

    /**
     * Array of all registered layout designer components
     */
    protected _components: Dictionary<LayoutDesignerSAComponent> = {};

    /**
     * Id of root component
     */
    protected _rootComponentId: string|null = null;

    /**
     * Id of selected component
     */
    protected _selectedComponent: string|null = null;

    //######################### public properties #########################

    /**
     * Gets id of selected component
     */
    public get selectedComponent(): string|null
    {
        return this._selectedComponent;
    }

    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Marks component as selected
     * @param id - Id of component that will be marked as selected
     */
    public selectComponent(id: string): void
    {
        const oldId = this._selectedComponent;
        
        this._selectedComponent = id;

        if(isPresent(oldId))
        {
            const component = this._components[oldId];

            if(component)
            {
                component.invalidateVisuals();
            }
        }
    }

    /**
     * Removes selection of component
     */
    public unselectComponent(): void
    {
        this._selectedComponent = null;
    }

    /**
     * Registers layout designer component and returns true if component was registered successfuly, otherwise false
     * @param component - Component instance that is being registered
     * @param id - Id of registered component
     */
    public registerLayoutDesignerComponent(component: LayoutDesignerSAComponent, id: string): boolean
    {
        if(isEmptyObject(this._components))
        {
            this._rootComponentId = id;
        }

        //already exists
        if(this._components[id])
        {
            this._logger?.error(`LayoutMetadataManager: Component with id ${id} is already registered!`);

            return false;
        }

        this._components[id] = component;

        return true;
    }

    /**
     * Unregisters layout designer component
     * @param id - Id of component that will be unregistered
     */
    public unregisterLayoutDesignerComponent(id: string): void
    {
        delete this._components[id];

        if(id === this._rootComponentId)
        {
            this._rootComponentId = null;
        }
    }

    /**
     * Updated id of registered component
     * @param oldId - Old id that was already registered
     * @param newId - New id that is going to be set
     */
    public updatedLayoutDesignerComponentId(oldId: string, newId: string): void
    {
        const component = this._components[oldId];

        if(component)
        {
            this._components[newId] = component;
            delete this._components[oldId];

            if(oldId === this._rootComponentId)
            {
                this._rootComponentId = newId;
            }
        }
    }

    /**
     * Gets layout component metadata which is using this service
     */
    public getMetadata(): LayoutComponentMetadata|null
    {
        if(isBlank(this._rootComponentId) || !this._components[this._rootComponentId])
        {
            return null;
        }

        return this._components[this._rootComponentId].options?.typeMetadata ?? null;
    }
}