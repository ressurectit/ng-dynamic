import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';

import {GridPanelAreaComponentOptions} from './gridPanelArea.options';
import {GridPanelAreaLayoutMetadataLoader} from './gridPanelArea.metadata';
import {applyGridCoordinates} from './gridPanelArea.utils';

/**
 * Component used for displaying grid panel area
 */
@Component(
{
    selector: 'grid-panel-area',
    templateUrl: 'gridPanelArea.component.html',
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<GridPanelAreaComponentOptions>(options => options?.component ? [options.component] : [])
@LayoutEditorMetadata(GridPanelAreaLayoutMetadataLoader)
export class GridPanelAreaSAComponent extends LayoutComponentBase<GridPanelAreaComponentOptions> implements LayoutComponent<GridPanelAreaComponentOptions>
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        const style = this.componentElement.nativeElement.style;
        
        applyGridCoordinates(this.options, style);
    }
}