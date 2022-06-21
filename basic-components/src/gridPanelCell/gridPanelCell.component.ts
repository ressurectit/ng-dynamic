import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelCellComponentOptions} from './gridPanelCell.options';
import {GridPanelCellLayoutMetadata} from './gridPanelCell.metadata';

/**
 * Component used for displaying grid panel cell
 */
@Component(
{
    selector: 'grid-panel-cell',
    templateUrl: 'gridPanelCell.component.html',
    styleUrls: ['gridPanelCell.component.css'],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(GridPanelCellLayoutMetadata)
export class GridPanelCellSAComponent extends LayoutComponentBase<GridPanelCellComponentOptions> implements LayoutComponent<GridPanelCellComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _optionsSet(): void
    {
        const style = this._element.nativeElement.style;
        
        style.gridRowStart = this._options?.gridRowStart?.toString() ?? '';
        style.gridRowEnd = this._options?.gridRowEnd?.toString() ?? '';
        style.gridColumnStart = this._options?.gridColumnStart?.toString() ?? '';
        style.gridColumnEnd = this._options?.gridColumnEnd?.toString() ?? '';
    }
}