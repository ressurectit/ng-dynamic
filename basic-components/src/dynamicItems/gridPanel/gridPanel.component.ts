import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';
import {GridPanelLayoutMetadataLoader} from './gridPanel.metadata';
import {ToGridColumnsTemplatePipe, ToGridRowsTemplatePipe} from '../../misc/pipes';

/**
 * Component used for displaying grid panel layout
 */
@Component(
{
    selector: 'grid-panel',
    templateUrl: 'gridPanel.component.html',
    styleUrl: 'gridPanel.component.css',
    standalone: true,
    imports:
    [
        CommonModule,
        ToGridRowsTemplatePipe,
        ToGridColumnsTemplatePipe,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridPanelComponentOptions>(options => options?.areas ?? [])
@LayoutEditorMetadata(GridPanelLayoutMetadataLoader)
export class GridPanelSAComponent extends LayoutComponentBase<GridPanelComponentOptions> implements LayoutComponent<GridPanelComponentOptions>
{
}