import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PagingComponentOptions} from './paging.options';
import {PagingLayoutDesignerTypeLoader, PagingLayoutMetadataLoader} from './paging.metadata';

/**
 * Component used for displaying paging
 */
@Component(
{
    selector: 'paging',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<PagingComponentOptions>(options =>
{
    if(!options?.plugin)
    {
        return [];
    }

    return [options.plugin];
})
@LayoutEditorDesignerType(PagingLayoutDesignerTypeLoader)
@LayoutEditorMetadata(PagingLayoutMetadataLoader)
export class PagingComponent extends LayoutComponentBase<PagingComponentOptions> implements LayoutComponent<PagingComponentOptions>
{
}