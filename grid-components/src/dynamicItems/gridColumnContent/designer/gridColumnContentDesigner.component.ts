import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnContentComponentOptions} from '../gridColumnContent.options';
import {GridColumnContentComponent} from '../gridColumnContent.component';

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
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnContentDesignerComponent extends GridColumnContentComponent implements LayoutComponent<GridColumnContentComponentOptions>
{
}