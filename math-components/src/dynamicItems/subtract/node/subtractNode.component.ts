import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';

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
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        CommonModule,
        FirstUppercaseLocalizePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathSubtractNodeComponent extends RelationsNodeBase<MathSubtractRelationsOptions> implements RelationsNode<MathSubtractRelationsOptions>
{}