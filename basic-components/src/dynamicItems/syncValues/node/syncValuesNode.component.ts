import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

import {SyncValuesRelationsOptions} from '../syncValues.options';

/**
 * Sync values node component for negation
 */
@Component(
{
    selector: 'sync-values-node',
    templateUrl: 'syncValuesNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncValuesNodeSAComponent extends RelationsNodeBase<SyncValuesRelationsOptions> implements RelationsNode<SyncValuesRelationsOptions>
{
}