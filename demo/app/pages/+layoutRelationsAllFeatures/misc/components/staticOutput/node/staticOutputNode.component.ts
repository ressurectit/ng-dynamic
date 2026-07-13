import {Component} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for static output
 */
@Component(
{
    selector: 'static-output-node',
    templateUrl: 'staticOutputNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
    ],
})
export class StaticOutputNodeComponent extends RelationsNodeBase implements RelationsNode
{
}