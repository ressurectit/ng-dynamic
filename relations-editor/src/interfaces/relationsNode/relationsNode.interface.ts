import {OnChanges} from '@angular/core';
import {DynamicItem} from '@anglr/dynamic';
import {Dictionary} from '@jscrpt/common';

import {RelationsNodeMetadata} from '../metadata';
import {RelationsInput, RelationsOutput} from '../relationsEndpoint/relationsEndpoint.interface';

/**
 * Definition of relations node
 */
export interface RelationsNode<TOptions = any, TEditorOptions = any> extends DynamicItem, OnChanges
{
    /**
     * Id of relations node
     */
    readonly id: string;

    /**
     * Array of all available outputs
     */
    readonly allOutputs: readonly RelationsOutput[];

    /**
     * Object storing inputs by their names
     */
    readonly inputs: Dictionary<RelationsInput>;

    /**
     * Object storing outputs by their names
     */
    readonly outputs: Dictionary<RelationsOutput>;

    /**
     * Editor zoom level
     */
    zoomLevel: number;
    
    /**
     * Metadata for relations node
     */
    metadata: RelationsNodeMetadata<TOptions, TEditorOptions>|undefined|null;
}