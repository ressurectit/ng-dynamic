import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetadataStorage} from '@anglr/dynamic';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {CustomComponentRelationsOptions} from '../customComponent.options';
import {ComponentInputsRelationsOptions} from '../../componentInputs';
import {ComponentOutputsRelationsOptions} from '../../componentOutputs';

/**
 * Relations node component for custom component
 */
@Component(
{
    selector: 'custom-component-node',
    templateUrl: 'customComponentNode.component.html',
    // styleUrls: ['customComponentNode.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentNodeSAComponent extends RelationsNodeBase<CustomComponentRelationsOptions> implements RelationsNode<CustomComponentRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Storage for relations metadata
     */
    protected relationsMetadataStorage: MetadataStorage<RelationsNodeMetadata[]>|null = inject(RELATIONS_METADATA_STORAGE);

    //######################### protected properties - template bindings #########################

    /**
     * Metadata that contains information about available inputs
     */
    protected inputsMeta: RelationsNodeMetadata<ComponentInputsRelationsOptions>|undefined;

    /**
     * Metadata that contains information about available outputs
     */
    protected outputsMeta: RelationsNodeMetadata<ComponentOutputsRelationsOptions>|undefined;

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async metadataSet(): Promise<void>
    {
        if(!this.metadata)
        {
            return;
        }

        this.metadata.relationsOptions ??= 
        {
            name: ''
        };

        this.metadata.relationsOptions.name = this.metadata.name;
        const relations = await this.relationsMetadataStorage?.getMetadata(this.metadata.name) ?? [];
        this.inputsMeta = relations.find(itm => itm.package == 'custom-components' && itm.name == 'componentInputs');
        this.outputsMeta = relations.find(itm => itm.package == 'custom-components' && itm.name == 'componentOutputs');

        this.changeDetector.detectChanges();
    }
}