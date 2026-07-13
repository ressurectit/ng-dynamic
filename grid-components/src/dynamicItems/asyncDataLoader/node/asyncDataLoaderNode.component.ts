import {Component} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationsNodeHeaderComponent, RelationNodeOutputComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for async data loader
 */
@Component(
{
    selector: 'async-data-loader-node',
    templateUrl: 'asyncDataLoaderNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
})
export class AsyncDataLoaderNodeComponent extends RelationsNodeBase implements RelationsNode
{
}