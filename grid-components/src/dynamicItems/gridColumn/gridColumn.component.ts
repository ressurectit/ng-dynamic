import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnComponentOptions} from './gridColumn.options';
import {GridColumnLayoutDesignerTypeLoader, GridColumnLayoutMetadataLoader} from './gridColumn.metadata';

/**
 * Component used for displaying grid column
 */
@Component(
{
    selector: 'grid-column',
    template: '',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridColumnComponentOptions>(options => 
{
    if(!options)
    {
        return [];
    }

    return [options.header, options.content];
})
@LayoutEditorDesignerType(GridColumnLayoutDesignerTypeLoader)
@LayoutEditorMetadata(GridColumnLayoutMetadataLoader)
export class GridColumnSAComponent extends LayoutComponentBase<GridColumnComponentOptions> implements LayoutComponent<GridColumnComponentOptions>
{
}