import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for sample change
 */
@Component(
{
    selector: 'sample-change-node',
    templateUrl: 'sampleChangeNode.component.html',
    // styleUrls: ['sampleChangeNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleChangeNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}