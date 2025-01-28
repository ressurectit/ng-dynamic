import {Component, ChangeDetectionStrategy, inject, SimpleChanges} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {LayoutDesignerDirective, LayoutEditorMetadataManager, LayoutEditorRenderer} from '@anglr/dynamic/layout-editor';
import {addSimpleChange} from '@anglr/dynamic';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnComponent} from '../gridColumn.component';

/**
 * Component used for displaying grid column designer
 */
@Component(
{
    selector: 'grid-column-designer',
    templateUrl: 'gridColumnDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnDesignerComponent extends GridColumnComponent implements LayoutComponent<GridColumnComponentOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of manager for layout editor metadata
     */
    protected metadataManager: LayoutEditorMetadataManager = inject(LayoutEditorMetadataManager);

    /**
     * Instance of layout renderer
     */
    protected layoutRenderer: LayoutEditorRenderer = inject(LayoutEditorRenderer);

    //######################### protected properties #########################

    /**
     * Gets instance of grid columns
     */
    protected get gridColumns(): LayoutComponent
    {
        const parent = this.metadataManager.getParent(this.injector.get(LayoutDesignerDirective).metadataSafe.id);

        if(!parent)
        {
            throw new Error('GridColumnDesignerComponent: component without parent!');
        }

        const parentComponent = this.layoutRenderer.get(parent.metadataSafe.id)?.component?.instance;

        if(!parentComponent)
        {
            throw new Error('GridColumnDesignerComponent: missing parent component instance!');
        }

        return parentComponent;
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this.optionsSafe.header ??=
        {
            id: `gridColumnHeader-${generateId(10)}`,
            name: 'gridColumnHeader',
            package: 'grid-components',
            displayName: 'header',
            options:
            {
                content: null,
            },
        };

        this.optionsSafe.content ??=
        {
            id: `gridColumnContent-${generateId(10)}`,
            name: 'gridColumnContent',
            package: 'grid-components',
            displayName: 'content',
            options:
            {
                content: null,
            },
        };
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsChange(): void
    {
        const gridColumns = this.gridColumns;

        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', gridColumns.options, gridColumns.options, false);

        gridColumns.dynamicOnChanges?.(changes);
        gridColumns.invalidateVisuals();
    }
}