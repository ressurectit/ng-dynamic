import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary, isBlank, isPresent} from '@jscrpt/common';

import type {LayoutDesignerSAComponent} from '../../components';
import {LayoutEditorMetadataManagerComponent} from '../../interfaces';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutEditorMetadataManager
{
    //######################### protected fields #########################

    /**
     * Array of all registered layout designer components
     */
    protected _components: Dictionary<LayoutEditorMetadataManagerComponent> = {};

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

    /**
     * Gets tree root for component tree
     */
    public get root(): LayoutEditorMetadataManagerComponent|undefined|null
    {
        if(isBlank(this._rootComponentId))
        {
            return null;
        }

        return this._components[this._rootComponentId];
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
            const item = this._components[oldId];

            if(item)
            {
                item.component.invalidateVisuals();
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
     * @param parentId - Id of parent that holds this component
     */
    public registerLayoutDesignerComponent(component: LayoutDesignerSAComponent, id: string, parentId: string|undefined): boolean
    {
        if(isBlank(parentId))
        {
            this._rootComponentId = id;
        }

        //already exists
        if(this._components[id])
        {
            this._logger?.error(`LayoutEditorMetadataManager: Component with id ${id} is already registered!`);

            return false;
        }

        const parent = parentId ? this._components[parentId] : null;
        const componentItem: LayoutEditorMetadataManagerComponent = 
        {
            component,
            parent,
            children: []
        };

        this._components[id] = componentItem;
        
        //insert into parent at the end
        if(parent)
        {
            parent.children.splice(parent.children.length, 0, componentItem);
        }

        return true;
    }

    /**
     * Move comopnent to new parent
     * @param id - Id of component to be moved
     * @param parentId - Id of component to be used as new parent
     * @param index - Index at which should component placed at new parent
     */
    public moveLayoutDesignerComponent(id: string, parentId: string, index: number): void
    {
        const componentItem = this._components[id];
        const parentItem = this._components[parentId];

        if(!componentItem || !parentItem)
        {
            this._logger?.error(`LayoutEditorMetadataManager: Unable to move item '${id}' into '${parentId}', missing components`);

            return;
        }

        //unregister from parent
        if(componentItem.parent)
        {
            const index = componentItem.parent.children.indexOf(componentItem);
            componentItem.parent.children.splice(index, 1);
        }

        //move into new parent
        parentItem.children.splice(index, 0, componentItem);

    }

    /**
     * Gets component from designer component tree
     * @param id - Id of component to be get
     */
    public getComponent(id: string): LayoutDesignerSAComponent|null
    {
        return this._components[id].component;
    }

    /**
     * Unregisters layout designer component
     * @param id - Id of component that will be unregistered
     */
    public unregisterLayoutDesignerComponent(id: string): void
    {
        const componentItem = this._components[id];
        delete this._components[id];
        
        //unregister from parent
        if(componentItem?.parent)
        {
            const index = componentItem.parent.children.indexOf(componentItem);
            componentItem.parent.children.splice(index, 1);
        }

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

        return this._components[this._rootComponentId].component.options?.typeMetadata ?? null;
    }
}