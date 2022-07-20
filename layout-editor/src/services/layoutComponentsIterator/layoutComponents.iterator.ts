import {Logger} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Action} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor} from '../../decorators';
import {LayoutEditorMetadataExtractor} from '../layoutEditorMetadataExtractor/layoutEditorMetadataExtractor.service';
import {LayoutComponentsIteratorItem} from './layoutComponentsIterator.interface';

//TODO: make action commented type

/**
 * Iterator for layout components
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
        if(!this._initialized)
        {
            this._initialized = true;

            await this._getComponents();
        }

        for(const item of this._items)
        {
            callback(item.metadata, item.parentMetadata, item.levelIndex, item.level);
        }
    }

    //######################### protected methods #########################

    protected async _getComponents(): Promise<void>
    {
        await this._getComponent(this._layoutMetadata, null, 0, 0);
    }

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
}