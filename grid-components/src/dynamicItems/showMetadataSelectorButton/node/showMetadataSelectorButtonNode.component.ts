import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for show metadata selector button
 */
@Component(
{
    selector: 'show-selector-metadata-button-node',
    templateUrl: 'showMetadataSelectorButtonNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMetadataSelectorButtonNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}