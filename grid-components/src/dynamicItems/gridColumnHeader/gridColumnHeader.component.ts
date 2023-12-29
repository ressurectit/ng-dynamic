import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnHeaderComponentOptions} from './gridColumnHeader.options';
import {GridColumnHeaderLayoutDesignerTypeLoader, GridColumnHeaderLayoutMetadataLoader} from './gridColumnHeader.metadata';

/**
 * Component used for displaying grid column header
 */
@Component(
{
    selector: 'grid-column-header',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridColumnHeaderComponentOptions>(options => 
{
    if(!options?.content)
    {
        return [];
    }

    return [options.content];
})
@LayoutEditorDesignerType(GridColumnHeaderLayoutDesignerTypeLoader)
@LayoutEditorMetadata(GridColumnHeaderLayoutMetadataLoader)
export class GridColumnHeaderSAComponent extends LayoutComponentBase<GridColumnHeaderComponentOptions> implements LayoutComponent<GridColumnHeaderComponentOptions>
{
}