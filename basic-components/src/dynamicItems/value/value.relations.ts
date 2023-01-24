import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {ValueRelationsMetadataLoader} from './value.metadata';
import {ValueRelationsOptions} from './value.options';

//TODO: change all TOptions for specific value and relations options too

/**
 * Value relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(ValueRelationsMetadataLoader)
export class ValueRelations<TValue = any> implements RelationsComponent<ValueRelationsOptions<TValue>>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: ValueRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): ValueRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: ValueRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;
        this.value = this.ɵRelationsOptions?.value ?? null;
    }

    //######################### public properties - dynamic outputs #########################

    /**
     * Value of value node
     */
    @DynamicOutput()
    public value: TValue|undefined|null;

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}