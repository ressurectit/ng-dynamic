import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';

import {MathMultiplyRelationsOptions} from '../multiply.options';

/**
 * Relations node component for math multiply
 */
@Component(
{
    selector: 'math-multiply-node',
    templateUrl: 'multiplyNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        CommonModule,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathMultiplyNodeComponent extends RelationsNodeBase<MathMultiplyRelationsOptions> implements RelationsNode<MathMultiplyRelationsOptions>
{}