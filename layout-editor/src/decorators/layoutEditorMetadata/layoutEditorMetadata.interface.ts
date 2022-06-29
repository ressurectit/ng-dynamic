import {Type} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Dictionary, Func} from '@jscrpt/common';

import {PropertiesControl, PropertyTypeControl} from '../../interfaces';

/**
 * Defines type for layout properties model
 */
export interface LayoutPropertiesModelType<TType = any>
{
    new(value: TType|undefined|null): TType;
}

/**
 * Metadata for options/properties editation
 */
export interface LayoutEditorOptionsMetadata
{
    /**
     * Type of model used within properties editor
     */
    modelType: LayoutPropertiesModelType;

    /**
     * Array of properties controls used for editation of properties/options
     */
    propertiesControls: Type<PropertiesControl>[];

    /**
     * Overrides of controls used in properties controls
     */
    propertyTypeControlOverride?: Dictionary<Type<PropertyTypeControl>>;
}

/**
 * Holds meta information about layout component
 */
export interface LayoutEditorMetadataInfo<TOptions = any>
{
    /**
     * Display name of component in palette
     */
    readonly name?: string;

    /**
     * Description of component in palette
     */
    readonly description?: string;

    /**
     * Name of group in palette
     */
    readonly group?: string;

    /**
     * Gets indication whether is component drag enabled or disabled
     */
    readonly dragDisabled?: boolean;

    /**
     * Metadata for options if there are any
     */
    readonly optionsMetadata?: LayoutEditorOptionsMetadata;

    /**
     * Instance of default options used when new empty object is created
     */
    readonly defaultOptions?: TOptions;
}

/**
 * Class that represents layout editor metadata
 */
export interface LayoutEditorMetadataDescriptor<TOptions = any>
{
    /**
     * Meta information about layout component
     */
    readonly metaInfo?: LayoutEditorMetadataInfo<TOptions>;
    
    /**
     * Adds descendant metadata to component options
     * @param metadata - Metadata containing definition of new descendant to be added
     * @param options - Options that should be extended with new descendant metadata
     * @param index - Index where should be new item added
     */
    readonly addDescendant?: Action<[LayoutComponentMetadata, TOptions, number]>;

    /**
     * Applies designer styles that are required to be applied to drag n drop div
     * @param options - Options containing styles to be applied
     * @param styles - Css object storing html element styles
     */
    readonly applyDesignerStyles?: Action<[TOptions|null|undefined, CSSStyleDeclaration]>;
    
    /**
     * Tests whether component can accept new metadata to be dropped in, or not (whether child, children can be added)
     * @param options - Options that holds information whether another metadata can be dropped into options metadata
     */
    readonly canDropMetadata?: Func<boolean, [TOptions|undefined|null]>;

    /**
     * Tests whether component has horizontal drop
     * @param options - Options that holds information whether horizontal drop is enabled for this component
     */
    readonly isHorizontalDrop?: Func<boolean, [TOptions|undefined|null]>;

    /**
     * Removes descendant metadata from component options
     * @param id - Id of component metadata to be removed
     * @param options - Options that should be updated by removing descendant metadata
     */
    readonly removeDescendant?: Action<[string, TOptions]>;
}

/**
 * Definition of type that holds layout editor metadata
 */
export interface LayoutEditorMetadataType
{
    /**
     * Metadata for layout editor
     */
    layoutEditorMetadata?: AsyncProperties<LayoutEditorMetadataDescriptor>;
}