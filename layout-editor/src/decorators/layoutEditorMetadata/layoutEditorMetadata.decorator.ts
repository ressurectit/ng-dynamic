import {DynamicClassMetadata, DynamicMetadataCtor} from '@anglr/dynamic';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataType} from '../../interfaces';

/**
 * Sets layout editor metadata to class on which is this decorator applied
 * @param metadata - Layout editor metadata type to be created by decorator
 */
export function LayoutEditorMetadata(metadata: DynamicMetadataCtor<LayoutEditorMetadataDescriptor>): ClassDecorator
{
    return DynamicClassMetadata<LayoutEditorMetadataDescriptor, LayoutEditorMetadataType>(metadata, 'layoutEditorMetadata');
}