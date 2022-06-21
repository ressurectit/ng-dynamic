import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

/**
 * Class that represents layout editor metadata
 */
export interface LayoutEditorMetadataDescriptor<TLayoutComponentOptions = any>
{
    /**
     * Applies designer styles that are required to be applied to drag n drop div
     */
    readonly applyDesignerStyles?: Action<[TLayoutComponentOptions|null|undefined, CSSStyleDeclaration]>;

    /**
     * Getter for obtaining components children metadata
     */
    readonly descendantsGetter?: Func<LayoutComponentMetadata[]|LayoutComponentMetadata|undefined|null, [LayoutComponentMetadata<TLayoutComponentOptions>]>;
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