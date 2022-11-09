import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataDescriptor, LayoutEditorPropertyMetadataExtractor} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';

import {CustomComponentConfiguration} from '../../services';

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
 * Data that are passed to custom component options dialog
 */
export interface CustomComponentOptionsData<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration>
{
    /**
     * Metadata for each component in custom component
     */
    customComponentContentMetadata: Dictionary<ContentComponentData|undefined|null>;

    /**
     * Current value of configuration
     */
    configuration: TConfig;

    /**
     * Instance of property metadata extractor for models
     */
    propsMetadataExtractor: LayoutEditorPropertyMetadataExtractor;
}