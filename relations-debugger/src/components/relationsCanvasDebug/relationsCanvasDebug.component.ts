import {Component, ChangeDetectionStrategy, ExistingProvider, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NodeRelationPath, RelationsCanvasSAComponent, RelationsNodeRendererSADirective} from '@anglr/dynamic/relations-editor';
import {select} from 'd3';

import {NodeRelationPathDebug} from '../../misc/nodeRelationPathDebug';

/**
 * Component used as designer component wrapper for relations component in debugging
 */
@Component(
{
    selector: 'relations-canvas-debug',
    templateUrl: '../../../../relations-editor/src/components/relationsCanvas/relationsCanvas.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        RelationsNodeRendererSADirective,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: RelationsCanvasSAComponent,
            useExisting: forwardRef(() => RelationsCanvasDebugSAComponent),
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasDebugSAComponent extends RelationsCanvasSAComponent
{
    //######################### public methods - overrides #########################

    /**
     * Creates node relation path
     */
    public override createRelation(): NodeRelationPath
    {
        return new NodeRelationPathDebug(select(this.relationsGroup?.nativeElement), this.relationManager, this.history, null, null);
    }
}