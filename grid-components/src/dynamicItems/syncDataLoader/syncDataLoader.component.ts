import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {SyncDataLoaderComponentOptions, SyncDataLoaderRelationsOptions} from './syncDataLoader.options';
import {SyncDataLoaderLayoutDesignerTypeLoader, SyncDataLoaderLayoutMetadataLoader, SyncDataLoaderRelationsMetadataLoader} from './syncDataLoader.metadata';

/**
 * Component used for displaying sync data loader
 */
@Component(
{
    selector: 'sync-data-loader',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(SyncDataLoaderLayoutDesignerTypeLoader)
@RelationsEditorMetadata(SyncDataLoaderRelationsMetadataLoader)
@LayoutEditorMetadata(SyncDataLoaderLayoutMetadataLoader)
export class SyncDataLoaderSAComponent extends LayoutComponentBase<SyncDataLoaderComponentOptions> implements LayoutComponent<SyncDataLoaderComponentOptions>, RelationsComponent<SyncDataLoaderRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: SyncDataLoaderRelationsOptions|undefined|null;
}