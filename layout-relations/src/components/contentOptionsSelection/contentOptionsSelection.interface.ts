import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorPropertyMetadataExtractor} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';

/**
 * Data that are stored for content component
 */
export interface ContentComponentData
{
    /**
     * Metadata of component
     */
    metadata: LayoutComponentMetadata;

    /**
     * Editor metadata of component
     */
    editorMetadata: LayoutEditorMetadataDescriptor;
}

/**
 * Data that are passed to content options selection dialog
 */
export interface ContentOptionsSelectionData
{
    /**
     * Metadata for each component in custom component
     */
    customComponentContentMetadata: Dictionary<ContentComponentData|undefined|null>;

    /**
     * Array of used components and their model names
     */
    usedProperties: Dictionary<Dictionary<string[]>>;

    /**
     * Instance of property metadata extractor for models
     */
    propsMetadataExtractor: LayoutEditorPropertyMetadataExtractor;
}