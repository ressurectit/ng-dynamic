import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for async data loader
 */
@Component(
{
    selector: 'async-data-loader-node',
    templateUrl: 'asyncDataLoaderNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncDataLoaderNodeSAComponent extends RelationsNodeBase implements RelationsNode
{
}