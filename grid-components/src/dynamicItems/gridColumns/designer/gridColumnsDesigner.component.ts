import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostFlexRowStyle} from '@anglr/common';

import {GridColumnsComponentOptions} from '../gridColumns.options';
import {GridColumnsComponent} from '../gridColumns.component';

/**
 * Component used for displaying grid columns designer
 */
@Component(
{
    selector: 'grid-columns-designer',
    templateUrl: 'gridColumnsDesigner.component.html',
    styles: [HostFlexRowStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsDesignerComponent extends GridColumnsComponent implements LayoutComponent<GridColumnsComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        let colsDef = '';

        for(const col of this.optionsSafe.columns)
        {
            colsDef += `${col.options?.width || '1fr'} `;
        }

        this.componentElement.nativeElement.style.gridTemplateColumns = colsDef.trim();
    }
}