import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {EditorHotkeys, MetadataStateManager} from '@anglr/dynamic';
import {Dictionary, extend, generateId, isBlank} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import type {LayoutDesignerSAComponent} from '../../components';
import {LayoutEditorMetadataManagerComponent} from './layoutEditorMetadataManager.interface';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutEditorMetadataManager implements MetadataStateManager<LayoutComponentMetadata>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Clipboard for layout metadata copy/paste/cut operations
     */
    protected metadataClipboard: LayoutComponentMetadata|undefined|null;

    /**
     * Array of all registered layout designer components
     */
    protected components: Dictionary<LayoutEditorMetadataManagerComponent> = {};

    /**
     * Id of root component
     */
    protected rootComponentId: string|null = null;

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
    protected layoutChangeSubject: Subject<void> = new Subject<void>();

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

    /**
     * Id of dragged over component
     */
    protected _draggedOverComponent: string|null = null;

    /**
     * Used for emitting dragged over component changes
     */
    protected _draggedOverComponentChange: Subject<void> = new Subject<void>();

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
     * Gets id of dragged over component
     */
    public get draggedOverComponent(): string|null
    {
        return this._draggedOverComponent;
    }

    /**
     * Gets tree root for component tree
     */
    public get root(): LayoutEditorMetadataManagerComponent|undefined|null
    {
        if(isBlank(this.rootComponentId))
        {
            return null;
        }

        return this.components[this.rootComponentId];
    }

    /**
     * Occurs when layout changes
     */
    public get layoutChange(): Observable<void>
    {
        return this.layoutChangeSubject.asObservable();
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
     * Occurs when dragged over component changes
     */
    public get draggedOverComponentChange(): Observable<void>
    {
        return this._draggedOverComponentChange.asObservable();
    }

    /**
     * Gets flattened tree of components tree
     */
    public get flatTree(): LayoutEditorMetadataManagerComponent[]
    {
        return (this._flatTree ??= this._buildFlatTree());
    }

    //######################### constructor #########################
    constructor(protected _editorHotkeys: EditorHotkeys,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
        this.initSubscriptions.add(this._editorHotkeys.delete.subscribe(() => 
        {
            if(!this.selectedComponent)
            {
                return;
            }

            const component = this.components[this.selectedComponent];

            if(!component?.parent)
            {
                return;
            }

            component.parent.component.removeDescendant(this.selectedComponent);
            component.parent.component.invalidateVisuals();
        }));

        this.initSubscriptions.add(this._editorHotkeys.copy.subscribe(() =>
        {
            if(!this.selectedComponent)
            {
                return;
            }

            const component = this.components[this.selectedComponent];
            this.metadataClipboard = component.component.options?.typeMetadata;
        }));

        this.initSubscriptions.add(this._editorHotkeys.cut.subscribe(() =>
        {
            if(!this.selectedComponent)
            {
                return;
            }

            const component = this.components[this.selectedComponent];

            if(!component?.parent)
            {
                return;
            }

            this.metadataClipboard = component.component.options?.typeMetadata;
            component.parent.component.removeDescendant(this.selectedComponent);
            component.parent.component.invalidateVisuals();
        }));

        this.initSubscriptions.add(this._editorHotkeys.paste.subscribe(() =>
        {
            if(!this.selectedComponent || !this.metadataClipboard)
            {
                return;
            }

            const component = this.components[this.selectedComponent];
            const newId = `${this.metadataClipboard.name}-${generateId(12)}`;

            if(component.component.canDrop)
            {
                component.component.addDescendant(
                {
                    index: 0,
                    metadata: extend({}, this.metadataClipboard, 
                    {
                        id: newId,
                        displayName: newId,
                    }),
                    parentId: null,
                });
            }
            else if(component.parent?.component.canDrop)
            {
                component.parent.component.addDescendant(
                {
                    index: component.component.index + 1,
                    metadata: extend({}, this.metadataClipboard, 
                    {
                        id: newId,
                        displayName: newId,
                    }),
                    parentId: null,
                });
            }
        }));
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
     * Mark component as being dragged over
     * @param id - Id of component that will be marked
     */
    public dragOverComponent(id?: string): void
    {
        if (id === this._draggedOverComponent)
        {
            return;
        }

        this._draggedOverComponent = id ?? null;
        this._draggedOverComponentChange.next();
    }

    /**
     * Removes indication of component being dragged over
     * @param id - Id of component that will be marked
     */
    public cancelDragOverComponent(): void
    {
        this._draggedOverComponent = null;
        this._draggedOverComponentChange.next();
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
            this.rootComponentId = id;
        }

        //already exists
        if(this.components[id])
        {
            this._logger?.error(`LayoutEditorMetadataManager: Component with id ${id} is already registered!`);

            return false;
        }

        const parent = parentId ? this.components[parentId] : null;
        const componentItem: LayoutEditorMetadataManagerComponent = 
        {
            component,
            parent,
            children: []
        };

        this.components[id] = componentItem;
        
        //insert into parent at the end
        if(parent)
        {
            parent.children.push(componentItem);
        }

        this._flatTree = null;
        this.layoutChangeSubject.next();

        this._logger?.debug('LayoutEditorMetadataManager: Registering component {{@id}}', {id: id});

        return true;
    }

    /**
     * Gets component from designer component tree
     * @param id - Id of component to be get
     */
    public getComponent(id: string): LayoutDesignerSAComponent|null
    {
        return this.components[id]?.component ?? null;
    }

    /**
     * Gets parent of component by id
     * @param id - Id of component which parent will be get
     */
    public getParent(id: string): LayoutDesignerSAComponent|null
    {
        return this.components[id]?.parent?.component ?? null;
    }

    /**
     * Gets index of componet in its parent, if not parent or id not found null is returned
     * @param id - Id of component which index from parent will be obtained
     */
    public getIndex(id: string): number|null
    {
        const item = this.components[id];

        if(!item || !item.parent)
        {
            return null;
        }

        return item.parent.children.indexOf(item);
    }

    /**
     * Gets component definition with information about component tree
     * @param id - Id of component definition 
     */
    public getComponentDef(id: string): LayoutEditorMetadataManagerComponent|null
    {
        return this.components[id] ?? null;
    }

    /**
     * Unregisters layout designer component
     * @param id - Id of component that will be unregistered
     */
    public unregisterLayoutDesignerComponent(id: string): void
    {
        const componentItem = this.components[id];
        delete this.components[id];
        
        //unregister from parent
        if(componentItem?.parent)
        {
            const index = componentItem.parent.children.indexOf(componentItem);
            componentItem.parent.children.splice(index, 1);
        }

        if(id === this.rootComponentId)
        {
            this.rootComponentId = null;
        }

        this._flatTree = null;
        this.layoutChangeSubject.next();

        this._logger?.debug('LayoutEditorMetadataManager: Unregistering component {{@id}}', {id: id});
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
        if(isBlank(this.rootComponentId) || !this.components[this.rootComponentId])
        {
            return null;
        }

        return this.components[this.rootComponentId].component.options?.typeMetadata ?? null;
    }

    //######################### protected methods #########################

    /**
     * Builds flattened tree of components tree
     */
    protected _buildFlatTree(): LayoutEditorMetadataManagerComponent[]
    {
        if(isBlank(this.rootComponentId))
        {
            return [];
        }

        const component = this.components[this.rootComponentId];

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