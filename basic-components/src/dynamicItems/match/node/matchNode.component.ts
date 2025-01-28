import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for match
 */
@Component(
{
    selector: 'match-node',
    templateUrl: 'matchNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchNodeComponent extends RelationsNodeBase implements RelationsNode
{
}