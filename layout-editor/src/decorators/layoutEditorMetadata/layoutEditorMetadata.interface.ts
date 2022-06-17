import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Func} from '@jscrpt/common';

/**
 * Class that represents layout editor metadata
 */
export interface LayoutEditorMetadataDescriptor<TLayoutComponentMetadata extends LayoutComponentMetadata = any>
{
    /**
     * Getter for obtaining components children metadata
     */
    readonly descendantsGetter?: Func<LayoutComponentMetadata[]|LayoutComponentMetadata|undefined|null, [TLayoutComponentMetadata]>;
}

/**
 * Definition of type that holds layout editor metadata
 */
export interface LayoutEditorMetadataType
{
    /**
     * Metadata for layout editor
     */
    layoutEditorMetadata: AsyncProperties<LayoutEditorMetadataDescriptor>;
}