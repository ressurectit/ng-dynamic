import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

import {FirstNonNullRelationsOptions} from '../firstNonNull.options';

/**
 * Relations node component for first non null
 */
@Component(
{
    selector: 'first-non-null-node',
    templateUrl: 'firstNonNullNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstNonNullNodeSAComponent extends RelationsNodeBase<FirstNonNullRelationsOptions> implements RelationsNode<FirstNonNullRelationsOptions>
{
}