import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PagingComponentOptions} from '../paging.options';
import {PagingSAComponent} from '../paging.component';

/**
 * Component used for displaying paging designer
 */
@Component(
{
    selector: 'paging-designer',
    templateUrl: 'pagingDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagingDesignerSAComponent extends PagingSAComponent implements LayoutComponent<PagingComponentOptions>
{
}