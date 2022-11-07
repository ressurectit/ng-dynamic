import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';
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
    customComponentContentMetadata: Dictionary<ContentComponentData>;

    /**
     * Array of used components and their model names
     */
    usedComponents: Dictionary<string[]>;
}