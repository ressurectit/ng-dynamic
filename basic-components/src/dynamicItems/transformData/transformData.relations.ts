import {PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {TransformDataRelationsMetadataLoader} from './transformData.metadata';
import {TransformDataRelationsOptions} from './transformData.options';

/**
 * Transform data relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(TransformDataRelationsMetadataLoader)
export class TransformDataRelations implements RelationsComponent<TransformDataRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: TransformDataRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): TransformDataRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: TransformDataRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}