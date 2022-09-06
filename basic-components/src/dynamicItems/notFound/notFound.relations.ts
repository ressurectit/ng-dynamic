import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {NotFoundRelationsMetadataLoader} from './notFound.metadata';
import {NotFoundRelationsOptions} from './notFound.options';

/**
 * Not found relations component
 */
@RelationsEditorMetadata(NotFoundRelationsMetadataLoader)
export class NotFoundRelations implements RelationsComponent<NotFoundRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: NotFoundRelationsOptions|undefined|null;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}