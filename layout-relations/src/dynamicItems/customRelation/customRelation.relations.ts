import {PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {CustomRelationRelationsMetadataLoader} from './customRelation.metadata';
import {CustomRelationRelationsOptions} from './customRelation.options';

/**
 * Custom relation relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(CustomRelationRelationsMetadataLoader)
export class CustomRelationRelations implements RelationsComponent<CustomRelationRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: CustomRelationRelationsOptions|undefined|null;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}