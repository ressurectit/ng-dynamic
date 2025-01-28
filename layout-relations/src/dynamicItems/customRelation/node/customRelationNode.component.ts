import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent, RelationNodeOutputComponent, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {CustomRelationRelationsOptions} from '../customRelation.options';
import {ComponentInputsRelationsOptions} from '../../componentInputs';
import {ComponentOutputsRelationsOptions} from '../../componentOutputs';
import {getInputs, getOutputs} from '../customRelation.utils';

/**
 * Relations node component for custom relation
 */
@Component(
{
    selector: 'custom-relation-node',
    templateUrl: 'customRelationNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomRelationNodeComponent extends RelationsNodeBase<CustomRelationRelationsOptions> implements RelationsNode<CustomRelationRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Storage for relations metadata
     */
    protected relationsMetadataStorage: MetadataStorage<RelationsNodeMetadata[]> = inject(RELATIONS_METADATA_STORAGE);

    //######################### protected properties - template bindings #########################

    /**
     * Metadata that contains information about available inputs
     */
    protected inputsMeta: RelationsNodeMetadata<ComponentInputsRelationsOptions>|undefined;

    /**
     * Metadata that contains information about available outputs
     */
    protected outputsMeta: RelationsNodeMetadata<ComponentOutputsRelationsOptions>|undefined;

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public override async initialize(): Promise<void>
    {
        if(!this.metadata)
        {
            return;
        }

        this.metadata.relationsOptions = 
        {
            name: this.metadata.name,
            id: this.metadata.id,
        };

        const relations = await this.relationsMetadataStorage?.getMetadata(this.metadata.name) ?? [];

        this.inputsMeta = getInputs(relations);
        this.outputsMeta = getOutputs(relations);
    }
}