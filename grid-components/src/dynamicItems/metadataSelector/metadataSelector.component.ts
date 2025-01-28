import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MetadataSelectorComponentOptions} from './metadataSelector.options';
import {MetadataSelectorLayoutDesignerTypeLoader, MetadataSelectorLayoutMetadataLoader} from './metadataSelector.metadata';

/**
 * Component used for displaying metadata selector
 */
@Component(
{
    selector: 'metadata-selector',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<MetadataSelectorComponentOptions>(options =>
{
    if(!options?.plugin)
    {
        return [];
    }

    return [options.plugin];
})
@LayoutEditorDesignerType(MetadataSelectorLayoutDesignerTypeLoader)
@LayoutEditorMetadata(MetadataSelectorLayoutMetadataLoader)
export class MetadataSelectorComponent extends LayoutComponentBase<MetadataSelectorComponentOptions> implements LayoutComponent<MetadataSelectorComponentOptions>
{
}