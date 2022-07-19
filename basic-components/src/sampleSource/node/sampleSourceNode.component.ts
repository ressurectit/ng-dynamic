import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for sample source
 */
@Component(
{
    selector: 'sample-source-node',
    templateUrl: 'sampleSourceNode.component.html',
    styleUrls: ['sampleSourceNode.component.css'],
    standalone: true,
    imports:
    [
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSourceNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected metadataSet(): void
    {
    }
}