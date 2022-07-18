import type {RelationsComponentMetadata} from '@anglr/dynamic/relations';

import {Coordinates} from '../../coordinates/coordinates.interface';

/**
 * Metadata for relations node
 */
export interface NodeMetadata<TOptions = any>
{
    /**
     * Coordinates of relations node
     */
    coordinates: Coordinates|undefined|null;

    /**
     * Options passed to relations node
     */
    options: TOptions|undefined|null;
}

/**
 * Relations node metadata
 */
export interface RelationsNodeMetadata<TOptions = any, TEditorOptions = any> extends RelationsComponentMetadata<TOptions>
{
    /**
     * Metadata for relations node
     */
    nodeMetadata: NodeMetadata<TEditorOptions>|undefined|null;
}