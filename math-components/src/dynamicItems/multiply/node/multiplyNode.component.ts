import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

import {MathMultiplyRelationsOptions} from '../multiply.options';

/**
 * Relations node component for math multiply
 */
@Component(
{
    selector: 'math-multiply-node',
    templateUrl: 'multiplyNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathMultiplyNodeSAComponent extends RelationsNodeBase<MathMultiplyRelationsOptions> implements RelationsNode<MathMultiplyRelationsOptions>
{}