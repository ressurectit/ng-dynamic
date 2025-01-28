import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';

import {MathDivideRelationsOptions} from '../divide.options';

/**
 * Relations node component for math divide operation
 */
@Component(
{
    selector: 'math-divide-node',
    templateUrl: 'divideNode.component.html',
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
export class MathDivideNodeComponent extends RelationsNodeBase<MathDivideRelationsOptions> implements RelationsNode<MathDivideRelationsOptions>
{}