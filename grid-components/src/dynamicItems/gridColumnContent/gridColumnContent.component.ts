import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnContentComponentOptions} from './gridColumnContent.options';
import {GridColumnContentLayoutDesignerTypeLoader, GridColumnContentLayoutMetadataLoader} from './gridColumnContent.metadata';

/**
 * Component used for displaying grid column content
 */
@Component(
{
    selector: 'grid-column-content',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridColumnContentComponentOptions>(options =>
{
    if(!options?.content)
    {
        return [];
    }

    return [options.content];
})
@LayoutEditorDesignerType(GridColumnContentLayoutDesignerTypeLoader)
@LayoutEditorMetadata(GridColumnContentLayoutMetadataLoader)
export class GridColumnContentComponent extends LayoutComponentBase<GridColumnContentComponentOptions> implements LayoutComponent<GridColumnContentComponentOptions>
{
}