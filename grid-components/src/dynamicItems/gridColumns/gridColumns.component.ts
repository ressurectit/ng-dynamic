import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {MatrixGridModule} from '@anglr/grid';

import {GridColumnsComponentOptions} from './gridColumns.options';
import {GridColumnsLayoutDesignerTypeLoader, GridColumnsLayoutMetadataLoader} from './gridColumns.metadata';

/**
 * Component used for displaying grid columns
 */
@Component(
{
    selector: 'grid-columns',
    templateUrl: 'gridColumns.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        MatrixGridModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridColumnsComponentOptions>(options => 
{
    return options?.columns ?? [];
})
@LayoutEditorDesignerType(GridColumnsLayoutDesignerTypeLoader)
@LayoutEditorMetadata(GridColumnsLayoutMetadataLoader)
export class GridColumnsSAComponent extends LayoutComponentBase<GridColumnsComponentOptions> implements LayoutComponent<GridColumnsComponentOptions>
{
}