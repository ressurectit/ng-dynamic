import {Component, ChangeDetectionStrategy} from '@angular/core';
import {StyledLayoutComponent, StyledLayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';
import {GridPanelLayoutMetadata} from './gridPanel.metadata';

/**
 * Component used for displaying grid panel layout
 */
@Component(
{
    selector: 'grid-panel',
    templateUrl: 'gridPanel.component.html',
    styleUrls: ['gridPanel.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(GridPanelLayoutMetadata)
export class GridPanelComponent extends StyledLayoutComponentBase<GridPanelComponentOptions> implements StyledLayoutComponent<GridPanelComponentOptions>
{
}