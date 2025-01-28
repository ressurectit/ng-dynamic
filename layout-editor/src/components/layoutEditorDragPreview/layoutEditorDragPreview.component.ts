import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Component used for displaying layout editor drag preview
 */
@Component(
{
    selector: 'layout-editor-drag-preview',
    templateUrl: 'layoutEditorDragPreview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorDragPreviewSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * Layout metadata for dragged component
     */
    @Input()
    public layoutMetadata?: LayoutComponentMetadata|null;
}