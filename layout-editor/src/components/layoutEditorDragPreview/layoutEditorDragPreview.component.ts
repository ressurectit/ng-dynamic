import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {LayoutEditorMetadataDescriptor} from '../../decorators';

/**
 * Component used for displaying layout editor drag preview
 */
@Component(
{
    selector: 'layout-editor-drag-preview',
    templateUrl: 'layoutEditorDragPreview.component.html',
    styleUrls: ['layoutEditorDragPreview.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorDragPreviewSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * Layout editor metadata for dragged component
     */
    @Input()
    public editorMetadata?: LayoutEditorMetadataDescriptor|null;

    /**
     * Layout metadata for dragged component
     */
    @Input()
    public layoutMetadata?: LayoutComponentMetadata|null;
}