import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {DataLoaderComponentOptions} from './dataLoader.options';
import {DataLoaderLayoutDesignerTypeLoader, DataLoaderLayoutMetadataLoader} from './dataLoader.metadata';

/**
 * Component used for displaying data loader
 */
@Component(
{
    selector: 'data-loader',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<DataLoaderComponentOptions>(options =>
{
    if(!options?.plugin)
    {
        return [];
    }

    return [options.plugin];
})
@LayoutEditorDesignerType(DataLoaderLayoutDesignerTypeLoader)
@LayoutEditorMetadata(DataLoaderLayoutMetadataLoader)
export class DataLoaderSAComponent extends LayoutComponentBase<DataLoaderComponentOptions> implements LayoutComponent<DataLoaderComponentOptions>
{
}