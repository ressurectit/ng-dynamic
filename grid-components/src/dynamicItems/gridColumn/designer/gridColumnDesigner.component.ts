import {Component, ChangeDetectionStrategy, inject, SimpleChanges} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutDesignerSAComponent, LayoutEditorMetadataManager, LayoutEditorRenderer} from '@anglr/dynamic/layout-editor';
import {addSimpleChange} from '@anglr/dynamic';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {GridColumnComponentOptions} from '../gridColumn.options';
import {GridColumnSAComponent} from '../gridColumn.component';

/**
 * Component used for displaying grid column designer
 */
@Component(
{
    selector: 'grid-column-designer',
    templateUrl: 'gridColumnDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnDesignerSAComponent extends GridColumnSAComponent implements LayoutComponent<GridColumnComponentOptions>
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
        const parent = this.metadataManager.getParent(this.injector.get(LayoutDesignerSAComponent).id);

        if(!parent)
        {
            throw new Error('GridColumnDesignerSAComponent: component without parent!');
        }

        const parentComponent = this.layoutRenderer.get(parent.metadataSafe.id)?.component?.instance;

        if(!parentComponent)
        {
            throw new Error('GridColumnDesignerSAComponent: missing parent component instance!');
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