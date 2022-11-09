import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {generateId, PromiseOr} from '@jscrpt/common';

import {GridPanelComponentOptions} from './gridPanel.options';
import {GridPanelLayoutMetadataLoader} from './gridPanel.metadata';

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
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridPanelComponentOptions>(options => options?.cells ?? [])
@LayoutEditorMetadata(GridPanelLayoutMetadataLoader)
export class GridPanelSAComponent extends LayoutComponentBase<GridPanelComponentOptions> implements LayoutComponent<GridPanelComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): PromiseOr<void>
    {
        this._fixCells();

        const style = this.componentElement.nativeElement.style;
        let gridTemplateRows: string = '';
        let gridTemplateColumns: string = '';

        if(this.options?.rows && Array.isArray(this.options?.rows))
        {
            for(const row of this.options.rows)
            {
                gridTemplateRows += `${row.height} `;
            }
        }

        if(this.options?.columns && Array.isArray(this.options?.columns))
        {
            for(const column of this.options.columns)
            {
                gridTemplateColumns += `${column.width} `;
            }
        }

        style.gridTemplateRows = gridTemplateRows.trim();
        style.gridTemplateColumns = gridTemplateColumns.trim();
    }

    //######################### protected methods #########################

    /**
     * Fixes cell metadata
     */
    protected _fixCells(): void
    {
        if(!this.options)
        {
            return;
        }

        this.options.cells ??= [];

        const grid: string[][] = [];

        for(let y = 0; y < (this.options.rows ?? []).length; y++)
        for(let x = 0; x < (this.options.columns ?? []).length; x++)
        {
            grid[y] ??= [];
            grid[y][x] = '';
        }

        for(const cell of this.options.cells)
        {
            cell.package = 'basic-components';
            cell.name = 'gridPanelCell';

            for(let y = (cell.options?.gridRowStart ?? 1); y < (cell.options?.gridRowEnd ?? 2); y++)
            for(let x = (cell.options?.gridColumnStart ?? 1); x < (cell.options?.gridColumnEnd ?? 2); x++)
            {
                const yCoordinate = y - 1;
                const xCoordinate = x - 1;

                if(grid[yCoordinate][xCoordinate] === '')
                {
                    grid[yCoordinate][xCoordinate] = cell.id;
                }
            }
        }

        for(let y = 1; y <= (this.options.rows ?? []).length; y++)
        for(let x = 1; x <= (this.options.columns ?? []).length; x++)
        {
            if(grid[y - 1][x - 1] === '')
            {
                this.options.cells.push(
                {
                    id: `${generateId(6)}-r${y}-${y+1}-c${x}-${x+1}`,
                    package: 'basic-components',
                    name: 'gridPanelCell',
                    options:
                    {
                        gridRowStart: y,
                        gridRowEnd: y + 1,
                        gridColumnStart: x,
                        gridColumnEnd: x + 1
                    }
                });
            }
        }
    }
}