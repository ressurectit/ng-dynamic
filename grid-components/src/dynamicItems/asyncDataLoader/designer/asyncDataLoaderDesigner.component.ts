import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {AsyncDataLoaderComponentOptions, AsyncDataLoaderRelationsOptions} from '../asyncDataLoader.options';
import {AsyncDataLoaderComponent} from '../asyncDataLoader.component';

/**
 * Component used for displaying async data loader designer
 */
@Component(
{
    selector: 'async-data-loader-designer',
    templateUrl: 'asyncDataLoaderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncDataLoaderDesignerComponent extends AsyncDataLoaderComponent implements LayoutComponent<AsyncDataLoaderComponentOptions>, RelationsComponent<AsyncDataLoaderRelationsOptions>
{
}