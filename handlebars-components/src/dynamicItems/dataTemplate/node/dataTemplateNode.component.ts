import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for data template
 */
@Component(
{
    selector: 'data-template-node',
    templateUrl: 'dataTemplateNode.component.html',
    styleUrls: ['dataTemplateNode.component.css'],
    standalone: true,
    imports:
    [
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTemplateNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}