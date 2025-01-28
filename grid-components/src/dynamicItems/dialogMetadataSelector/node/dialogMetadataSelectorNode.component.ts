import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for dialog metadata selector
 */
@Component(
{
    selector: 'dialog-metadata-selector-node',
    templateUrl: 'dialogMetadataSelectorNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMetadataSelectorNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}