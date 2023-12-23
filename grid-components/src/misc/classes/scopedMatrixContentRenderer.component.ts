import {ChangeDetectionStrategy, Component, FactoryProvider, OnDestroy, ValueProvider} from '@angular/core';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER, CssGridDefaultTemplatesSAComponent, CurrentViewContainer, DEFAULT_OPTIONS, GridPlugin, MatrixContentRenderer, MatrixContentRendererOptions, MatrixContentRendererSAComponent} from '@anglr/grid';

/**
 * Default 'GridOptions'
 */
const defaultOptions: MatrixContentRendererOptions =
{
    defaults: CssGridDefaultTemplatesSAComponent,
    cssClasses:
    {
        gridContainerClass: 'grid-container-css-grid',
        headerContainerClass: 'grid-header-css-grid',
        contentContainerClass: 'grid-body-css-grid',
        footerContainerClass: 'grid-footer-css-grid',
        headerRowContainerClass: 'grid-header-row-css-grid',
        contentRowContainerClass: 'grid-content-row-css-grid',
        footerRowContainerClass: 'grid-footer-row-css-grid',
    },
};

/**
 * Component used for rendering dynamic scoped content using new 'matrix' metadata gatherer
 */
@Component(
{
    selector: 'div.matrix-content-renderer',
    templateUrl: 'scopedMatrixContentRenderer.component.html',
    standalone: true,
    providers:
    [
        <ValueProvider>
        {
            provide: DEFAULT_OPTIONS,
            useValue: defaultOptions,
        },
        <FactoryProvider>
        {
            provide: CONTENT_RENDERER_CURRENT_VIEW_CONTAINER,
            useFactory: () =>
            {
                return <CurrentViewContainer> {
                    viewContainer: null,
                };
            }
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopedMatrixContentRendererSAComponent extends MatrixContentRendererSAComponent implements MatrixContentRenderer, GridPlugin<MatrixContentRendererOptions>, OnDestroy
{
}