import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PagingComponentOptions} from '../paging.options';
import {PagingComponent} from '../paging.component';

/**
 * Component used for displaying paging designer
 */
@Component(
{
    selector: 'paging-designer',
    templateUrl: 'pagingDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagingDesignerComponent extends PagingComponent implements LayoutComponent<PagingComponentOptions>
{
}