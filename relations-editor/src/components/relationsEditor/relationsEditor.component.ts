import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {HostDisplayFlexStyle} from '@anglr/common';

import {NodesPaletteSAComponent} from '../nodesPalette/nodesPalette.component';
import {RelationsCanvasSAComponent} from '../relationsCanvas/relationsCanvas.component';
import {RelationsNodeDragData, RelationsNodeMetadata} from '../../interfaces';

/**
 * Component that represents relations editor with palette and canvas
 */
@Component(
{
    selector: 'relations-editor',
    templateUrl: 'relationsEditor.component.html',
    // styleUrls: ['relationsEditor.component.css'],
    styles: [HostDisplayFlexStyle],
    standalone: true,
    imports:
    [
        NodesPaletteSAComponent,
        RelationsCanvasSAComponent,
        DragDropModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsEditorSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * Metadata used for rendering relations in canvas
     */
    @Input()
    public metadata: RelationsNodeMetadata[] = [];

    //######################### protected methods - template bindings #########################

    /**
     * Adds new node into canvas and metadata
     * @param event - Drop event that occured
     */
    protected addNode(event: CdkDragDrop<RelationsNodeDragData, RelationsNodeDragData, RelationsNodeDragData>): void
    {
        //TODO: apply transform of canvas

        const canvasRect = event.container.element.nativeElement.getBoundingClientRect();

        if(event.item.data.metadata.nodeMetadata?.coordinates)
        {
            event.item.data.metadata.nodeMetadata.coordinates.x = event.dropPoint.x - canvasRect.x;
            event.item.data.metadata.nodeMetadata.coordinates.y = event.dropPoint.y - canvasRect.y;
        }

        this.metadata =
        [
            ...this.metadata,
            event.item.data.metadata,
        ];
    }
}