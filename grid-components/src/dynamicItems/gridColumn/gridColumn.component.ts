import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {GridColumnComponentOptions} from './gridColumn.options';
import {GridColumnLayoutDesignerTypeLoader, GridColumnLayoutMetadataLoader} from './gridColumn.metadata';

/**
 * Component used for displaying grid column
 */
@Component(
{
    selector: 'grid-column',
    templateUrl: 'gridColumn.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
// @DescendantsGetter<GridColumnComponentOptions>(options => 
// {
//     if(!options)
//     {
//         return [];
//     }

//     return [options.columns];
//     // return [options.columns, options.dataLoader, options.paging];
// })
@LayoutEditorDesignerType(GridColumnLayoutDesignerTypeLoader)
@LayoutEditorMetadata(GridColumnLayoutMetadataLoader)
export class GridColumnSAComponent extends LayoutComponentBase<GridColumnComponentOptions> implements LayoutComponent<GridColumnComponentOptions>
{
}