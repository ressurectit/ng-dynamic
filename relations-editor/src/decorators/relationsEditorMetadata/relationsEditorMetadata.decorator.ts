import {DynamicClassMetadata, DynamicMetadataLoader} from '@anglr/dynamic';

import {RelationsEditorMetadataDescriptor, RelationsEditorMetadataType} from './relationsEditorMetadata.interface';

/**
 * Sets relations editor metadata to class on which is this decorator applied
 * @param metadataLoader - Relations editor metadata loader function used for obtaining metadata
 */
export function RelationsEditorMetadata(metadataLoader: DynamicMetadataLoader<RelationsEditorMetadataDescriptor>): ClassDecorator
{
    return DynamicClassMetadata<RelationsEditorMetadataDescriptor, RelationsEditorMetadataType>(metadataLoader, 'relationsEditorMetadata');
}