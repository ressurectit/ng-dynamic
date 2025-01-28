import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';

import {MathAddRelationsOptions} from '../add.options';

/**
 * Relations node component for math add operation
 */
@Component(
{
    selector: 'math-addition-node',
    templateUrl: 'addNode.component.html',
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
export class MathAddNodeComponent extends RelationsNodeBase<MathAddRelationsOptions> implements RelationsNode<MathAddRelationsOptions>
{}