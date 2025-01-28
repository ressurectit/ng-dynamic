import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnContentComponentOptions} from '../gridColumnContent.options';
import {GridColumnContentSAComponent} from '../gridColumnContent.component';

/**
 * Component used for displaying grid column content designer
 */
@Component(
{
    selector: 'grid-column-content-designer',
    templateUrl: 'gridColumnContentDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnContentDesignerSAComponent extends GridColumnContentSAComponent implements LayoutComponent<GridColumnContentComponentOptions>
{
}