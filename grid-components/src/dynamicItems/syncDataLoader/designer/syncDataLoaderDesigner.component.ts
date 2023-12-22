import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {SyncDataLoaderComponentOptions, SyncDataLoaderRelationsOptions} from '../syncDataLoader.options';
import {SyncDataLoaderSAComponent} from '../syncDataLoader.component';

/**
 * Component used for displaying sync data loader designer
 */
@Component(
{
    selector: 'sync-data-loader-designer',
    templateUrl: 'syncDataLoaderDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncDataLoaderDesignerSAComponent extends SyncDataLoaderSAComponent implements LayoutComponent<SyncDataLoaderComponentOptions>, RelationsComponent<SyncDataLoaderRelationsOptions>
{
}