import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for show metadata selector button
 */
@Component(
{
    selector: 'show-selector-metadata-button-node',
    templateUrl: 'showMetadataSelectorButtonNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMetadataSelectorButtonNodeComponent extends RelationsNodeBase implements RelationsNode
{
}