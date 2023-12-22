import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnSAComponent} from '../gridColumn.component';

/**
 * Component used for displaying grid column designer
 */
@Component(
{
    selector: 'grid-column-designer',
    templateUrl: 'gridColumnDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnDesignerSAComponent extends GridColumnSAComponent implements LayoutComponent<GridColumnComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this.optionsSafe.header ??=
        {
            id: `gridColumnHeader-${generateId(10)}`,
            name: 'gridColumnHeader',
            package: 'grid-components',
            displayName: 'header',
            options: 
            {
                content: null,
            },
        };

        this.optionsSafe.content ??=
        {
            id: `gridColumnContent-${generateId(10)}`,
            name: 'gridColumnContent',
            package: 'grid-components',
            displayName: 'content',
            options: 
            {
                content: null,
            },
        };
    }
}