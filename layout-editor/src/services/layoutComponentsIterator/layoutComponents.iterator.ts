import {Logger} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor} from '../../decorators';
import {LayoutEditorMetadataExtractor} from '../layoutEditorMetadataExtractor/layoutEditorMetadataExtractor.service';
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
    protected _items: LayoutComponentsIteratorItem[] = [];

    /**
     * Indication whether was iterator initialized
     */
    protected _initialized: boolean = false;

    /**
     * Initialization promise
     */
    protected _initPromise: Promise<void>|null = null;

    //######################### public properties #########################

    /**
     * Async iterator for layout components metadata
     */
    public [Symbol.asyncIterator](): AsyncIterator<LayoutComponentsIteratorItem>
    {
        let x = 0;
        const initPromise = this._initPromise ??= this._getInitPromise();
        const items = this._items;

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
    constructor(protected _layoutMetadata: LayoutComponentMetadata<TOptions>,
                protected _extractor: LayoutEditorMetadataExtractor,
                protected _logger?: Logger,)
    {
    }

    //######################### public methods #########################

    /**
     * Calls callback for each component in tree
     * @param callback - Callback called for each layout component metadata
     */
    public async forEach(callback: Action<[LayoutComponentMetadata, LayoutComponentMetadata|undefined|null, number, number]>): Promise<void>
    {
        await (this._initPromise ??= this._getInitPromise());

        for(const item of this._items)
        {
            callback(item.metadata, item.parentMetadata, item.levelIndex, item.level);
        }
    }

    //######################### protected methods #########################

    /**
     * Gets components in layout components metadata hierarchy
     */
    protected async _getComponents(): Promise<void>
    {
        await this._getComponent(this._layoutMetadata, null, 0, 0);
    }

    /**
     * Gets metadata for single layout component metadata and its children
     * @param metadata - Metadata for layout component
     * @param parentMetadata - Metadata for parent layout component
     * @param levelIndex - Index of layout component in current level
     * @param level - Current level of nexted components, 0 is root component
     */
    protected async _getComponent(metadata: LayoutComponentMetadata<TOptions>, parentMetadata: LayoutComponentMetadata<TOptions>|undefined|null, levelIndex: number, level: number): Promise<void>
    {
        this._items.push(
        {
            metadata,
            parentMetadata,
            levelIndex,
            level
        });

        const meta = await this._extractor.extractMetadata(metadata) as LayoutEditorMetadataDescriptor<TOptions>;

        if(!meta)
        {
            this._logger?.debug('LayoutComponentsIterator: failed to get metadata for iterator! {@data}', {package: metadata.package, name: metadata.name});

            return;
        }

        //component does not have children
        if(!meta.getDescendants)
        {
            return;
        }

        const childrenMeta = meta.getDescendants(metadata.options);

        for(let x = 0; x < childrenMeta.length; x++)
        {
            await this._getComponent(childrenMeta[x], metadata, x, level + 1);
        }
    }

    /**
     * Gets initialization promise
     */
    protected async _getInitPromise(): Promise<void>
    {
        if(!this._initialized)
        {
            this._initialized = true;

            await this._getComponents();
        }
    }
}