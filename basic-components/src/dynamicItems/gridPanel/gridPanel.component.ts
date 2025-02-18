import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelComponentOptions} from './gridPanel.options';
import {GridPanelLayoutMetadataLoader} from './gridPanel.metadata';
import {toGridColumnsTemplate, toGridRowsTemplate} from '../../misc/utils';

/**
 * Component used for displaying grid panel layout
 */
@Component(
{
    selector: 'grid-panel',
    templateUrl: 'gridPanel.component.html',
    imports:
    [
        CommonModule,
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridPanelComponentOptions>(options => options?.areas ?? [])
@LayoutEditorMetadata(GridPanelLayoutMetadataLoader)
export class GridPanelComponent extends LayoutComponentBase<GridPanelComponentOptions> implements LayoutComponent<GridPanelComponentOptions>
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