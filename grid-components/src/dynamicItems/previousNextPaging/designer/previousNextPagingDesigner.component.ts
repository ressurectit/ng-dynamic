import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PreviousNextPagingComponentOptions} from '../previousNextPaging.options';
import {PreviousNextPagingComponent} from '../previousNextPaging.component';

/**
 * Component used for displaying previous next paging designer
 */
@Component(
{
    selector: 'next-previous-paging',
    templateUrl: 'previousNextPagingDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviousNextPagingDesignerComponent extends PreviousNextPagingComponent implements LayoutComponent<PreviousNextPagingComponentOptions>
{
}