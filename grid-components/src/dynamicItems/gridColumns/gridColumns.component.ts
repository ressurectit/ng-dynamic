import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {ComponentWithId} from '@anglr/dynamic/layout-relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {MatrixGridModule} from '@anglr/grid';

import {GridColumnsComponentOptions} from './gridColumns.options';
import {GridColumnsLayoutDesignerTypeLoader, GridColumnsLayoutMetadataLoader, GridColumnsRelationsMetadataLoader} from './gridColumns.metadata';

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
@RelationsEditorMetadata(GridColumnsRelationsMetadataLoader)
@LayoutEditorMetadata(GridColumnsLayoutMetadataLoader)
export class GridColumnsSAComponent extends LayoutComponentBase<GridColumnsComponentOptions> implements LayoutComponent<GridColumnsComponentOptions>, ComponentWithId
{
    //######################### public properties - implementation of ComponentWithId #########################
    
    /**
     * @inheritdoc
     */
    public id: string = '';

    //######################### public methods - implementation of ComponentWithId #########################

    /**
     * @inheritdoc
     */
    public setId(id: string): void
    {
        this.id = id;
    }
}