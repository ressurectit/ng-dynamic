import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetadataStorage} from '@anglr/dynamic';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {CustomComponentRelationsOptions} from '../customComponent.options';
import {ComponentInputsRelationsOptions} from '../../componentInputs';
import {ComponentOutputsRelationsOptions} from '../../componentOutputs';
import {LayoutComponentsRegister} from '../../../services';
import {getInputs, getOutputs} from '../customComponent.utils';

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
    protected relationsMetadataStorage: MetadataStorage<RelationsNodeMetadata[]> = inject(RELATIONS_METADATA_STORAGE);

    /**
     * Layout components register instance
     */
    protected layoutComponentsRegister: LayoutComponentsRegister = inject(LayoutComponentsRegister);

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

        this.metadata.relationsOptions ??= 
        {
            name: ''
        };

        const componentName = await this.layoutComponentsRegister.getComponentName(this.metadata.name);

        if(!componentName)
        {
            return;
        }

        this.metadata.relationsOptions.name = this.metadata.name;
        const relations = await this.relationsMetadataStorage?.getMetadata(componentName) ?? [];
        this.inputsMeta = getInputs(relations);
        this.outputsMeta = getOutputs(relations);
    }
}