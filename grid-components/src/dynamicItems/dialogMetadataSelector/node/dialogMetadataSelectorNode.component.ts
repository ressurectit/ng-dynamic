import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderComponent, RelationNodeOutputComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for dialog metadata selector
 */
@Component(
{
    selector: 'dialog-metadata-selector-node',
    templateUrl: 'dialogMetadataSelectorNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMetadataSelectorNodeComponent extends RelationsNodeBase implements RelationsNode
{
}