import type {RelationsComponentMetadata} from '@anglr/dynamic/relations';

import {Coordinates} from '../../coordinates/coordinates.interface';

/**
 * Metadata for relations editor
 */
export interface RelationsEditorMetadata<TOptions = any>
{
    /**
     * Coordinates of relations editor component
     */
    coordinates: Coordinates|undefined|null;

    /**
     * Options passed to relations editor component
     */
    options: TOptions|undefined|null;
}

/**
 * Relations editor component metadata
 */
export interface RelationsEditorComponentMetadata<TOptions = any, TEditorOptions = any> extends RelationsComponentMetadata<TOptions>
{
    /**
     * Metadata for editor
     */
    editorMetadata: RelationsEditorMetadata<TEditorOptions>|undefined|null;
}