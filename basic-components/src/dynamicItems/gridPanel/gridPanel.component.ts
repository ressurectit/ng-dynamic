import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';
import {GridPanelLayoutMetadataLoader} from './gridPanel.metadata';
import {ToGridColumnsTemplatePipe, ToGridRowsTemplatePipe} from '../../misc/pipes';
import {toGridColumnsTemplate, toGridRowsTemplate} from '../../misc/utils';

/**
 * Component used for displaying grid panel layout
 */
@Component(
{
    selector: 'grid-panel',
    templateUrl: 'gridPanel.component.html',
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
    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        this.componentElement.nativeElement.style.gridTemplateRows = toGridRowsTemplate(this.optionsSafe.rows);
        this.componentElement.nativeElement.style.gridTemplateColumns = toGridColumnsTemplate(this.optionsSafe.columns);
    }
}