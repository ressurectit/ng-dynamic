import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';

/**
 * Relations node component for html block
 */
@Component(
{
    selector: 'html-block-node',
    templateUrl: 'htmlBlockNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtmlBlockNodeComponent extends RelationsNodeBase implements RelationsNode
{
}