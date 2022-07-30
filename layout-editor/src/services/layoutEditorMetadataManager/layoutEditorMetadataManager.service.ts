import {Inject, Injectable, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {MetadataHistoryManagerState} from '@anglr/dynamic';
import {Dictionary, isBlank} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import type {LayoutDesignerSAComponent} from '../../components';
import {LayoutEditorMetadataManagerComponent} from './layoutEditorMetadataManager.interface';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutEditorMetadataManager implements MetadataHistoryManagerState<LayoutComponentMetadata>
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

    /**
     * Id of highlighted component
     */
    protected _highlightedComponent: string|null = null;

    /**
     * Used for emitting layout changes
     */
    protected _layoutChange: Subject<void> = new Subject<void>();

    /**
     * Used for emitting selected component changes
     */
    protected _selectedChange: Subject<void> = new Subject<void>();

    /**
     * Used for emitting highlighted component changes
     */
    protected _highlightedChange: Subject<void> = new Subject<void>();

    /**
     * Used for emitting changes in components display name
     */
    protected _displayNameChanges: Subject<void> = new Subject<void>();

    /**
     * Flattened tree of components tree
     */
    protected _flatTree: LayoutEditorMetadataManagerComponent[]|null = null;

    //######################### public properties #########################

    /**
     * Gets id of selected component
     */
    public get selectedComponent(): string|null
    {
        return this._selectedComponent;
    }

    /**
     * Gets id of highlighted component
     */
    public get highlightedComponent(): string|null
    {
        return this._highlightedComponent;
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

    /**
     * Occurs when layout changes
     */
    public get layoutChange(): Observable<void>
    {
        return this._layoutChange.asObservable();
    }

    /**
     * Occurs when selected component changes
     */
    public get selectedChange(): Observable<void>
    {
        return this._selectedChange.asObservable();
    }

    /**
     * Occurs when highlighted component changes
     */
    public get highlightedChange(): Observable<void>
    {
        return this._highlightedChange.asObservable();
    }

    /**
     * Occurs when display name of component changes
     */
    public get displayNameChange(): Observable<void>
    {
        return this._displayNameChanges.asObservable();
    }

    /**
     * Gets flattened tree of components tree
     */
    public get flatTree(): LayoutEditorMetadataManagerComponent[]
    {
        return (this._flatTree ??= this._buildFlatTree());
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
    public selectComponent(id?: string): void
    {
        this._selectedComponent = id ?? null;
        this._selectedChange.next();
    }

    /**
     * Removes selection of component
     */
    public unselectComponent(): void
    {
        this._selectedComponent = null;
        this._selectedChange.next();
    }

    /**
     * Marks component as highlighted
     * @param id - Id of component that will be marked as selected
     */
    public highlightComponent(id?: string): void
    {
        this._highlightedComponent = id ?? null;
        this._highlightedChange.next();
    }

    /**
     * Removes highlight of component
     */
    public cancelHighlightedComponent(): void
    {
        this._highlightedComponent = null;
        this._highlightedChange.next();
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

        this._flatTree = null;
        this._layoutChange.next();

        this._logger?.debug('LayoutEditorMetadataManager: Registering component {@id}', id);

        return true;
    }

    /**
     * Gets component from designer component tree
     * @param id - Id of component to be get
     */
    public getComponent(id: string): LayoutDesignerSAComponent|null
    {
        return this._components[id]?.component ?? null;
    }

    /**
     * Gets parent of component by id
     * @param id - Id of component which parent will be get
     */
    public getParent(id: string): LayoutDesignerSAComponent|null
    {
        return this._components[id]?.parent?.component ?? null;
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

        this._flatTree = null;
        this._layoutChange.next();

        this._logger?.debug('LayoutEditorMetadataManager: Unregistering component {@id}', id);
    }

    /**
     * Fires event indicating that display name of any component has changed
     */
    public displayNameUpdated(): void
    {
        this._displayNameChanges.next();
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

    //######################### protected methods #########################

    /**
     * Builds flattened tree of components tree
     */
    protected _buildFlatTree(): LayoutEditorMetadataManagerComponent[]
    {
        if(isBlank(this._rootComponentId))
        {
            return [];
        }

        const component = this._components[this._rootComponentId];

        if(!component)
        {
            return [];
        }

        return this._buildFlatTreeForComponent(component);
    }

    /**
     * Builds flattened tree of components tree
     * @param component - Component which tree should be flattened
     */
    protected _buildFlatTreeForComponent(component: LayoutEditorMetadataManagerComponent): LayoutEditorMetadataManagerComponent[]
    {
        let result: LayoutEditorMetadataManagerComponent[] = [component];

        for(const child of component.children)
        {
            result = result.concat(this._buildFlatTreeForComponent(child));
        }

        return result;
    }
}