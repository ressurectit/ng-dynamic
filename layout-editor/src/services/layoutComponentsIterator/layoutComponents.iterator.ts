import {Inject} from '@angular/core';
import {Logger} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponentDef, LayoutComponentMetadata, LAYOUT_COMPONENTS_LOADER} from '@anglr/dynamic/layout';
import {Action} from '@jscrpt/common';

import {getDescendantsGetter} from '../../decorators';
import {LayoutComponentsIteratorItem} from './layoutComponentsIterator.interface';

//TODO: make action commented type

/**
 * Iterator for layout components metadata
 */
export class LayoutComponentsIterator<TOptions = any>
{
    //######################### protected fields #########################

    /**
     * Array of layout component iterator items, flattened layout structure
     */
    protected items: LayoutComponentsIteratorItem[] = [];

    /**
     * Indication whether was iterator initialized
     */
    protected initialized: boolean = false;

    /**
     * Initialization promise
     */
    protected initPromise: Promise<void>|null = null;

    //######################### public properties #########################

    /**
     * Async iterator for layout components metadata
     */
    public [Symbol.asyncIterator](): AsyncIterator<LayoutComponentsIteratorItem>
    {
        let x = 0;
        const initPromise = this.initPromise ??= this.getInitPromise();
        const items = this.items;

        return {
            async next() 
            {
                await initPromise;
                
                if (x < items.length) 
                {
                    return {
                        value: items[x++],
                        done: false
                    };
                }
        
                return {
                    value: items[x - 1],
                    done: true 
                };
            }
        };
    }

    //######################### constructor #########################
    constructor(protected layoutMetadata: LayoutComponentMetadata<TOptions>,
                @Inject(LAYOUT_COMPONENTS_LOADER) protected loader: DynamicItemLoader<LayoutComponentDef>,
                protected logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Calls callback for each component in tree
     * @param callback - Callback called for each layout component metadata
     */
    public async forEach(callback: Action<[LayoutComponentMetadata, LayoutComponentsIteratorItem|undefined|null, number, number]>): Promise<void>
    {
        await (this.initPromise ??= this.getInitPromise());

        for(const item of this.items)
        {
            callback(item.metadata, item.parent, item.levelIndex, item.level);
        }
    }

    //######################### protected methods #########################

    /**
     * Gets components in layout components metadata hierarchy
     */
    protected async getComponents(): Promise<void>
    {
        await this.getComponent(this.layoutMetadata, null, 0, 0);
    }

    /**
     * Gets metadata for single layout component metadata and its children
     * @param metadata - Metadata for layout component
     * @param parentMetadata - parent layout component iterator item
     * @param levelIndex - Index of layout component in current level
     * @param level - Current level of nexted components, 0 is root component
     */
    protected async getComponent(metadata: LayoutComponentMetadata<TOptions>, parent: LayoutComponentsIteratorItem|undefined|null, levelIndex: number, level: number): Promise<void>
    {
        const iteratorItem : LayoutComponentsIteratorItem = {
            metadata,
            parent,
            levelIndex,
            level
        };
        
        this.items.push(iteratorItem);

        const def = await this.loader.loadItem(metadata);

        if(!def)
        {
            this.logger?.debug('LayoutComponentsIterator: failed to get dynamic component type for iterator! {{@data}}', {data: {package: metadata.package, name: metadata.name}});

            return;
        }

        const getDescendants = getDescendantsGetter(def.data);

        //component does not have children
        if(!getDescendants)
        {
            return;
        }

        const childrenMeta = getDescendants(metadata.options);

        for(let x = 0; x < childrenMeta.length; x++)
        {
            await this.getComponent(childrenMeta[x], iteratorItem, x, level + 1);
        }
    }

    /**
     * Gets initialization promise
     */
    protected async getInitPromise(): Promise<void>
    {
        if(!this.initialized)
        {
            this.initialized = true;

            await this.getComponents();
        }
    }
}