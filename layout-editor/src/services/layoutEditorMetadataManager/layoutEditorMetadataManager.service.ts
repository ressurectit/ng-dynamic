import {Inject, Injectable, OnDestroy, Optional, Signal, WritableSignal, signal} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {EditorHotkeys, EditorMetadataManager} from '@anglr/dynamic';
import {Dictionary, extend, generateId, isBlank, isPresent} from '@jscrpt/common';
import {Observable, Subject, Subscription} from 'rxjs';

import type {LayoutDesignerSAComponent} from '../../components';
import {LayoutEditorMetadataManagerComponent} from './layoutEditorMetadataManager.interface';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class LayoutEditorMetadataManager implements EditorMetadataManager<LayoutComponentMetadata>, OnDestroy
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
    protected ɵselectedComponent: WritableSignal<string|null> = signal(null);

    /**
     * Id of highlighted component
     */
    protected ɵhighlightedComponent: WritableSignal<string|null> = signal(null);

    /**
     * Used for emitting layout changes
     */
    protected layoutChangeSubject: Subject<void> = new Subject<void>();

    /**
     * Used for emitting changes in components display name
     */
    protected displayNameChangesSubject: Subject<void> = new Subject<void>();

    /**
     * Id of dragged over component
     */
    protected ɵdraggedOverComponent: WritableSignal<string|null> = signal(null);

    //######################### public properties #########################

    /**
     * Gets id of selected component
     */
    public get selectedComponent(): Signal<string|null>
    {
        return this.ɵselectedComponent.asReadonly();
    }

    /**
     * Gets id of highlighted component
     */
    public get highlightedComponent(): Signal<string|null>
    {
        return this.ɵhighlightedComponent.asReadonly();
    }

    /**
     * Gets id of dragged over component
     */
    public get draggedOverComponent(): Signal<string|null>
    {
        return this.ɵdraggedOverComponent.asReadonly();
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
     * Occurs when display name of component changes
     */
    public get displayNameChange(): Observable<void>
    {
        return this.displayNameChangesSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(@Inject(LOGGER) protected logger: Logger,
                @Optional() protected editorHotkeys?: EditorHotkeys,)
    {
        if(this.editorHotkeys)
        {

            this.initSubscriptions.add(this.editorHotkeys.delete.subscribe(() =>
            {
                const selectedComponent = this.selectedComponent();
    
                if(!selectedComponent)
                {
                    return;
                }
    
                const component = this.components[selectedComponent];
    
                if(!component?.parent)
                {
                    return;
                }
    
                component.parent.component.removeDescendant(selectedComponent);
                component.parent.component.invalidateVisuals();
            }));
    
            this.initSubscriptions.add(this.editorHotkeys.copy.subscribe(() =>
            {
                const selectedComponent = this.selectedComponent();
    
                if(!selectedComponent)
                {
                    return;
                }
    
                const component = this.components[selectedComponent];
                this.metadataClipboard = component.component.options?.typeMetadata;
            }));
    
            this.initSubscriptions.add(this.editorHotkeys.cut.subscribe(() =>
            {
                const selectedComponent = this.selectedComponent();
    
                if(!selectedComponent)
                {
                    return;
                }
    
                const component = this.components[selectedComponent];
    
                if(!component?.parent)
                {
                    return;
                }
    
                this.metadataClipboard = component.component.options?.typeMetadata;
                component.parent.component.removeDescendant(selectedComponent);
                component.parent.component.invalidateVisuals();
            }));
    
            this.initSubscriptions.add(this.editorHotkeys.paste.subscribe(() =>
            {
                const selectedComponent = this.selectedComponent();
    
                if(!selectedComponent || !this.metadataClipboard)
                {
                    return;
                }
    
                const component = this.components[selectedComponent];
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
        const selected = this.ɵselectedComponent();
        this.ɵselectedComponent.set(id ?? null);

        //clear selection
        if(isPresent(selected))
        {
            this.components[selected]?.component.invalidateVisuals();
        }

        //select new one
        if(isPresent(id))
        {
            this.components[id]?.component.invalidateVisuals();
        }
    }

    /**
     * Removes selection of component
     */
    public unselectComponent(): void
    {
        const selected = this.ɵselectedComponent();
        this.ɵselectedComponent.set(null);

        //clear selection
        if(isPresent(selected))
        {
            this.components[selected]?.component.invalidateVisuals();
        }
    }

    /**
     * Marks component as highlighted
     * @param id - Id of component that will be marked as selected
     */
    public highlightComponent(id?: string): void
    {
        const highlighted = this.ɵhighlightedComponent();
        this.ɵhighlightedComponent.set(id ?? null);

        //clear highlighted
        if(isPresent(highlighted))
        {
            this.components[highlighted]?.component.invalidateVisuals();
        }

        //highlight new one
        if(isPresent(id))
        {
            this.components[id]?.component.invalidateVisuals();
        }
    }

    /**
     * Removes highlight of component
     */
    public cancelHighlightedComponent(): void
    {
        const highlighted = this.ɵhighlightedComponent();
        this.ɵhighlightedComponent.set(null);

        //clear highlight
        if(isPresent(highlighted))
        {
            this.components[highlighted]?.component.invalidateVisuals();
        }
    }


    /**
     * Mark component as being dragged over
     * @param id - Id of component that will be marked
     */
    public dragOverComponent(id?: string): void
    {
        if (id === this.ɵdraggedOverComponent())
        {
            return;
        }

        this.ɵdraggedOverComponent.set(id ?? null);
    }

    //TODO: removal candidate
    /**
     * Removes indication of component being dragged over
     * @param id - Id of component that will be marked
     */
    public cancelDragOverComponent(): void
    {
        this.ɵdraggedOverComponent.set(null);
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
            this.logger.error(`LayoutEditorMetadataManager: Component with id ${id} is already registered!`);

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

        this.layoutChangeSubject.next();

        this.logger.debug('LayoutEditorMetadataManager: Registering component {{@id}}', {id: id});

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
     * Gets children of component
     * @param id - Id of component whose children are going to be get
     */
    public getChildren(id: string): LayoutDesignerSAComponent[]
    {
        return this.components[id]?.children?.map(itm => itm.component) ?? [];
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

        this.layoutChangeSubject.next();

        this.logger.debug('LayoutEditorMetadataManager: Unregistering component {{@id}}', {id: id});
    }

    /**
     * Fires event indicating that display name of any component has changed
     */
    public displayNameUpdated(): void
    {
        this.displayNameChangesSubject.next();
    }

    /**
     * Triggers event that layout has changed
     */
    public updateLayout(): void
    {
        this.layoutChangeSubject.next();
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
}