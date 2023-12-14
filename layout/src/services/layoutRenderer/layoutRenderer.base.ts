import {Injectable, Injector, ViewContainerRef, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicItemExtensionType, DynamicItemLoader} from '@anglr/dynamic';
import {Action1} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

import {LayoutComponentMetadata} from '../../interfaces';
import {LayoutRendererItem} from './layoutRenderer.interface';
import {LAYOUT_COMPONENTS_LOADER} from '../../misc/tokens';
import {LayoutComponentDef} from '../../misc/types';
import {LayoutRendererOptions} from './layoutRenderer.options';

/**
 * Base class for service used for handling rendering of layout
 */
@Injectable()
export abstract class LayoutRendererBase<TRendererItem extends LayoutRendererItem>
{
    //######################### protected properties #########################

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Instance of loader used for loading components metadata
     */
    protected loader: DynamicItemLoader<LayoutComponentDef> = inject(LAYOUT_COMPONENTS_LOADER);

    /**
     * Options for layout renderer
     */
    protected options: LayoutRendererOptions;

    /**
     * Subject used for emitting when rendering has finished
     */
    protected renderingFinishedSubject: Subject<void> = new Subject<void>();

    /**
     * Map of renderers and their data
     */
    protected renderers: Record<string, TRendererItem|undefined|null> = {};

    /**
     * Map of renderers and their data using rendered compmonent id
     */
    protected components: Record<string, TRendererItem|undefined|null> = {};

    /**
     * Gets root renderer
     */
    protected get rootRenderer(): TRendererItem|undefined|null
    {
        const renderers = Object.keys(this.renderers);

        for(const rendererId of renderers)
        {
            const renderer = this.renderers[rendererId];

            if(renderer?.parentId)
            {
                return this.renderers[renderer.parentId];
            }
        }
        
        return null;
    }

    //######################### public properties #########################

    /**
     * Occurs when rendering has finished
     */
    public get renderingFinished(): Observable<void>
    {
        return this.renderingFinishedSubject.asObservable();
    }

    //######################### constructor #########################
    constructor()
    {
        const globalOptions = inject(LayoutRendererOptions, {optional: true});

        if(!globalOptions || !(globalOptions instanceof LayoutRendererOptions))
        {
            this.options = new LayoutRendererOptions();
        }
        else
        {
            this.options = globalOptions;
        }
    }

    //######################### public methods #########################

    /**
     * Tests whether is component with id registered and rendered
     * @param id - Id of component to be tested
     */
    public hasComponent(id: string): boolean
    {
        return !!this.components[id];
    }

    /**
     * Tests whether is renderer with id registered
     * @param id - Id of renderer
     */
    public hasRenderer(id: string): boolean
    {
        return !!this.renderers[id];
    }

    /**
     * Registers renderer and renders its component
     * @param id - Unique id of renderer
     * @param parentId - Unique id of parents renderer or undefined|null if root renderer
     * @param viewContainer - View container attached to renderer used for rendering component
     * @param metadata - Metadata of rendered component
     * @param parentMetadata - Metadata of parent of rendere component
     * @param scopeId - Id of scope in which is this component rendered
     * @param childExtensions - Array of child extensions applied to component
     * @param renderedCallback - Callback called when registered component is fully rendered
     * @param customInjector - Instance of custom injector if provided
     */
    public abstract registerRenderer(id: string,
                                     parentId: string|undefined|null,
                                     viewContainer: ViewContainerRef,
                                     metadata: LayoutComponentMetadata,
                                     parentMetadata: LayoutComponentMetadata|undefined|null,
                                     scopeId: string|undefined|null,
                                     childExtensions: DynamicItemExtensionType[]|undefined|null,
                                     renderedCallback: Action1<LayoutRendererItem>|undefined|null,
                                     customInjector: Injector|undefined|null,): Promise<void>;

    /**
     * Destroyes renderer, removes it from register, destroyed renderer also destroys component, this is called when renderer is destroyed
     * @param id - Id of renderer
     */
    public destroyRenderer(id: string): void
    {
        this.logger.debug('LayoutRenderer: destroying renderer "{{id}}"', {id});

        const renderer = this.renderers[id];
        
        //if renderer exists remove it from register
        if(renderer)
        {
            this.logger.verbose('LayoutRenderer: removing renderer from registry "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }
    }
    
    /**
     * Unregisters renderer, removes it from register, destroys component, this is called when renderer is emptied
     * @param id - Id of renderer that will be removed
     */
    public unregisterRenderer(id: string): void
    {
        this.logger.debug('LayoutRenderer: ungregistering renderer "{{id}}"', {id});

        const renderer = this.renderers[id];

        //if renderer exists remove it from register and destroy component
        if(renderer)
        {
            this.logger.verbose('LayoutRenderer: destroying component "{{id}}"', {id});
            //destroys component
            renderer.viewContainer.clear();
            this.logger.verbose('LayoutRenderer: component destroyed "{{id}}"', {id});

            delete this.components[renderer.metadata.id];
            delete this.renderers[id];
        }
    }
}