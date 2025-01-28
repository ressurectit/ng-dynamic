import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

import {MathSubtractRelationsOptions} from '../subtract.options';

/**
 * Relations node component for math subtract operation
 */
@Component(
{
    selector: 'math-subtract-node',
    templateUrl: 'subtractNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        FirstUppercaseLocalizePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathSubtractNodeSAComponent extends RelationsNodeBase<MathSubtractRelationsOptions> implements RelationsNode<MathSubtractRelationsOptions>
{}