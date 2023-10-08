import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

import {MathDivideRelationsOptions} from '../divide.options';

/**
 * Relations node component for math divide operation
 */
@Component(
{
    selector: 'math-divide-node',
    templateUrl: 'divideNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathDivideNodeSAComponent extends RelationsNodeBase<MathDivideRelationsOptions> implements RelationsNode<MathDivideRelationsOptions>
{}