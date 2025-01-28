import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {SyncDataLoaderComponentOptions, SyncDataLoaderRelationsOptions} from '../syncDataLoader.options';
import {SyncDataLoaderComponent} from '../syncDataLoader.component';

/**
 * Component used for displaying sync data loader designer
 */
@Component(
{
    selector: 'sync-data-loader-designer',
    templateUrl: 'syncDataLoaderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncDataLoaderDesignerComponent extends SyncDataLoaderComponent implements LayoutComponent<SyncDataLoaderComponentOptions>, RelationsComponent<SyncDataLoaderRelationsOptions>
{
}