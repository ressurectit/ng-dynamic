import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for sample change
 */
@Component(
{
    selector: 'button-node',
    templateUrl: 'buttonNode.component.html',
    styleUrls: ['buttonNode.component.css'],
    standalone: true,
    imports:
    [
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected metadataSet(): void
    {
    }
}