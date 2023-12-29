import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {BasicPagingComponentOptions} from '../basicPaging.options';
import {BasicPagingSAComponent} from '../basicPaging.component';

/**
 * Component used for displaying basic paging designer
 */
@Component(
{
    selector: 'ng-basic-paging',
    templateUrl: 'basicPagingDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPagingDesignerSAComponent extends BasicPagingSAComponent implements LayoutComponent<BasicPagingComponentOptions>
{
}