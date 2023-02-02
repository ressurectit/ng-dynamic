import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationsCanvasSAComponent, RelationsNodeMetadata, RelationsNodeRendererSADirective} from '@anglr/dynamic/relations-editor';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsCanvasDebugSAComponent extends RelationsCanvasSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * @inheritdoc
     */
    @Input()
    public override nodeDefinitions: RelationsNodeMetadata[] = [];
}