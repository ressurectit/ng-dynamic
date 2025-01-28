import {Component, ChangeDetectionStrategy, ExistingProvider, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NodeRelationPath, RelationsCanvasComponent, RelationsNodeRendererDirective} from '@anglr/dynamic/relations-editor';
import {select} from 'd3';

import {NodeRelationPathDebug} from '../../misc/nodeRelationPathDebug';

/**
 * Component used as designer component wrapper for relations component in debugging
 */
@Component(
{
    selector: 'relations-canvas-debug',
    templateUrl: '../../../../relations-editor/src/components/relationsCanvas/relationsCanvas.component.html',
    imports:
    [
        CommonModule,
        RelationsNodeRendererDirective,
    ],
    providers:
    [
        <ExistingProvider>
        {
            provide: RelationsCanvasComponent,
            useExisting: forwardRef(() => RelationsCanvasDebugComponent),
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasDebugComponent extends RelationsCanvasComponent
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