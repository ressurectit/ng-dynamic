import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for component inputs
 */
@Component(
{
    selector: 'component-inputs-node',
    templateUrl: 'componentInputsNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentInputsNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}