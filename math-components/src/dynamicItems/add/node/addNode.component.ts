import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';

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
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MathAddNodeSAComponent extends RelationsNodeBase<MathAddRelationsOptions> implements RelationsNode<MathAddRelationsOptions>
{}