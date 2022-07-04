import {DynamicClassMetadata, DynamicMetadataLoader} from '@anglr/dynamic';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataType} from '../../decorators';

/**
 * Sets layout editor metadata to class on which is this decorator applied
 * @param metadataLoader - Layout editor metadata loader function used for obtaining metadata
 */
export function LayoutEditorMetadata(metadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor>): ClassDecorator
{
    return DynamicClassMetadata<LayoutEditorMetadataDescriptor, LayoutEditorMetadataType>(metadataLoader, 'layoutEditorMetadata');
}