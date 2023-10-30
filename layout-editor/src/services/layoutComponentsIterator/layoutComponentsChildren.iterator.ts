import {Inject} from '@angular/core';
import {Logger} from '@anglr/common';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LayoutComponentDef, LayoutComponentMetadata, LAYOUT_COMPONENTS_LOADER} from '@anglr/dynamic/layout';

import {getDescendantsGetter} from '../../decorators';
import {LayoutComponentsChildrenIteratorItem} from './layoutComponentsIterator.interface';

/**
 * Iterator for layout components children metadata
 */
export class LayoutComponentsChildrenIterator<TOptions = any>
{
    //######################### protected fields #########################

    /**
     * Array of layout component iterator children items
     */
    protected items: LayoutComponentsChildrenIteratorItem[] = [];

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
     * Async iterator for layout components children metadata
     */
    public [Symbol.asyncIterator](): AsyncIterator<LayoutComponentsChildrenIteratorItem>
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

    //######################### protected methods #########################

    /**
     * Gets children in layout components metadata hierarchy
     */
    protected async getChildren(): Promise<void>
    {
        await this.getComponent(this.layoutMetadata);
    }

    /**
     * Gets children metadata for single layout component metadata
     * @param metadata - Metadata for layout component
     */
    protected async getComponent(metadata: LayoutComponentMetadata<TOptions>): Promise<void>
    {
        const def = await this.loader.loadItem(metadata);

        if(!def)
        {
            this.logger?.debug('LayoutComponentsChildrenIterator: failed to get dynamic component type for children iterator! {{@data}}', {data: {package: metadata.package, name: metadata.name}});

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
            this.items.push(
            {
                index: x,
                metadata: childrenMeta[x]
            });
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

            await this.getChildren();
        }
    }
}