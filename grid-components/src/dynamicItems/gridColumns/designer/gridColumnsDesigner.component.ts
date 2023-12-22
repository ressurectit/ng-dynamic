import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutDesignerSAComponent} from '@anglr/dynamic/layout-editor';
import {ComponentWithId} from '@anglr/dynamic/layout-relations';
import {HostFlexRowStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {GridColumnsComponentOptions} from '../gridColumns.options';
import {GridColumnsSAComponent} from '../gridColumns.component';

/**
 * Component used for displaying grid columns designer
 */
@Component(
{
    selector: 'grid-columns-designer',
    templateUrl: 'gridColumnsDesigner.component.html',
    styles: [HostFlexRowStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnsDesignerSAComponent extends GridColumnsSAComponent implements LayoutComponent<GridColumnsComponentOptions>, ComponentWithId
{
    //######################### protected properties #########################

    /**
     * Instance of designer component
     */
    protected designer: LayoutDesignerSAComponent = inject(LayoutDesignerSAComponent);

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        if(!this.designer.options)
        {
            return;
        }

        this.designer.options.typeMetadata.scope ??= generateId(10);
    }
}