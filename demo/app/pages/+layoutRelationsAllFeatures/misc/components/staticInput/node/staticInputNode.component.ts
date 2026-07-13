import {Component} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static input
 */
@Component(
{
    selector: 'static-input-node',
    templateUrl: 'staticInputNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
    ],
})
export class StaticInputNodeComponent extends RelationsNodeBase implements RelationsNode
{
}