import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

/**
 * Class that represents layout editor metadata
 */
export interface LayoutEditorMetadataDescriptor<TLayoutComponentOptions = any>
{
    /**
     * Adds descendant metadata to component options, returns changed options
     * @param metadata - Metadata containing definition of new descendant to be added
     * @param options - Options that should be extended with new descendant metadata
     * @param index - Index where should be new item added
     */
    readonly addDescendant?: Func<TLayoutComponentOptions, [LayoutComponentMetadata, TLayoutComponentOptions, number]>;

    /**
     * Applies designer styles that are required to be applied to drag n drop div
     * @param options - Options containing styles to be applied
     * @param styles - Css object storing html element styles
     */
    readonly applyDesignerStyles?: Action<[TLayoutComponentOptions|null|undefined, CSSStyleDeclaration]>;
    
    /**
     * Tests whether component can accept new metadata to be dropped in, or not (whether child, children can be added)
     * @param options - Options that holds information whether another metadata can be dropped into options metadata
     */
    readonly canDropMetadata?: Func<boolean, [TLayoutComponentOptions|undefined|null]>;

    /**
     * Removes descendant metadata from component options, returns changed options
     * @param id - Id of component metadata to be removed
     * @param options - Options that should be updated by removing descendant metadata
     */
    readonly removeDescendant?: Func<TLayoutComponentOptions, [string, TLayoutComponentOptions]>;
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