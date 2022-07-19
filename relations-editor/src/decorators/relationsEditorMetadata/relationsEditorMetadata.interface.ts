import {Type} from '@angular/core';

import {RelationsNode} from '../../interfaces';

/**
 * Holds meta information about relations node
 */
export interface RelationsEditorMetadataInfo<TOptions = any>
{
    /**
     * Display name of node in palette
     */
    readonly name?: string;

    /**
     * Description of node in palette
     */
    readonly description?: string;

    /**
     * Name of group in palette
     */
    readonly group?: string;

    /**
     * Instance of default options used when new empty object is created
     */
    readonly defaultOptions?: TOptions;
}

/**
 * Definition of relations editor meta info
 */
export interface RelationsEditorMetaInfo<TOptions = any>
{
    /**
     * Meta information about relations node
     */
    readonly metaInfo?: RelationsEditorMetadataInfo<TOptions>;
}

/**
 * Class that represents relations editor metadata
 */
export interface RelationsEditorMetadataDescriptor<TOptions = any> extends RelationsEditorMetaInfo<TOptions>
{
    /**
     * Definition of relations node type
     */
    readonly nodeDefinition: Type<RelationsNode<TOptions>>;
}

/**
 * Definition of type that holds relations editor metadata
 */
export interface RelationsEditorMetadataType
{
    /**
     * Metadata for relations editor
     */
    relationsEditorMetadata?: Promise<RelationsEditorMetadataDescriptor>;
}