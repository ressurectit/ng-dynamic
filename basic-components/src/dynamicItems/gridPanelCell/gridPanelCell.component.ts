import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';
import {GridPanelCellLayoutMetadataLoader} from './gridPanelCell.metadata';
import {applyGridCoordinates} from './gridPanelCell.utils';

/**
 * Component used for displaying grid panel cell
 */
@Component(
{
    selector: 'grid-panel-cell',
    templateUrl: 'gridPanelCell.component.html',
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridPanelCellComponentOptions>(options => options?.component ? [options.component] : [])
@LayoutEditorMetadata(GridPanelCellLayoutMetadataLoader)
export class GridPanelCellSAComponent extends LayoutComponentBase<GridPanelCellComponentOptions> implements LayoutComponent<GridPanelCellComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        const style = this.componentElement.nativeElement.style;
        
        applyGridCoordinates(this.options, style);
    }
}