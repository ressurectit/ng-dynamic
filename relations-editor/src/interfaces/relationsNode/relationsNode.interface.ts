import {OnChanges} from '@angular/core';
import {DynamicItem} from '@anglr/dynamic';
import {Dictionary, PromiseOr} from '@jscrpt/common';
import {Observable} from 'rxjs';

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
     * Occurs when node is being destroyed by user
     */
    readonly destroy: Observable<void>;

    /**
     * Editor zoom level
     */
    zoomLevel: number;
    
    /**
     * Metadata for relations node
     */
    metadata: RelationsNodeMetadata<TOptions, TEditorOptions>|undefined|null;

    /**
     * Initialize relations node
     */
    initialize(): PromiseOr<void>;
}

/**
 * Relations node editor data
 */
export interface RelationsNodeEditorData
{
    /**
     * Indication whether relations node can be used only once
     */
    singleton?: boolean;

    /**
     * Display name of relations node
     */
    displayName?: string;

    /**
     * Current scope of node that is being used
     */
    scope?: string;

    /**
     * Component name
     */
    name?: string;

    /**
     * Component package name
     */
    package?: string;
}