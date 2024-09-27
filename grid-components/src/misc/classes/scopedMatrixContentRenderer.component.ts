import {ChangeDetectionStrategy, Component, FactoryProvider, InjectionToken, Injector, OnDestroy, Provider, SimpleChanges, ValueProvider, inject} from '@angular/core';
import {CONTENT_RENDERER_CURRENT_VIEW_CONTAINER, CssGridDefaultTemplatesSAComponent, CurrentViewContainer, DEFAULT_OPTIONS, GridPlugin, MatrixContentRenderer, MatrixContentRendererOptions, MatrixContentRendererSAComponent} from '@anglr/grid';
import {Destroyable, SCOPE_ID, addSimpleChange} from '@anglr/dynamic';
import {RelationsChangeDetector, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {LayoutRenderer} from '@anglr/dynamic/layout';
import {Func1, generateId} from '@jscrpt/common';

import {GridColumnsRelationsHelper} from '../../dynamicItems/gridColumns/misc/classes/gridColumnsRelationsHelper/gridColumnsRelationsHelper';

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
 * Scope indentifier token
 */
const SCOPE_IDENTIFIER: InjectionToken<string> = new InjectionToken<string>('SCOPE_IDENTIFIER');

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
    //######################### protected fields #########################

    /**
     * Function used for obtaining parent injector 
     */
    protected parentInjectorFn: Func1<Injector, Injector>|undefined|null;

    /**
     * Array of destroyable injectors
     */
    protected injectors: (Destroyable|Injector)[] = [];

    /**
     * Array of destroyable relations helpers
     */
    protected relationsHelpers: Destroyable[] = [];

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override renderContentRowsContainers(): void
    {
        const viewContainer = this.currentViewContainer.viewContainer;
        const scopeIdentifier = generateId(6);
        const data = this.dataLoader?.result();
        const dataLength = data?.data?.length ?? 0;
        const metadata = this.metadataSelector?.metadata();

        for(const destroyable of this.relationsHelpers)
        {
            destroyable.destroy();
        }

        for(const destroyable of this.injectors)
        {
            const destroyableInjector = destroyable as Injector;

            destroyableInjector.get(RelationsComponentManager).ngOnDestroy();
            destroyableInjector.get(RelationsProcessor).destroyScope();

            (destroyable as Destroyable).destroy();
        }

        this.injectors = [];
        this.relationsHelpers = [];

        for(let datumIndex = 0; datumIndex < dataLength; datumIndex++)
        {
            const datum = data?.data[datumIndex];

            this.parentInjectorFn = parentInjector =>
            {
                //if obtaining injector for deeper 'level'
                if(parentInjector.get(SCOPE_IDENTIFIER, null, {optional: true}) === scopeIdentifier)
                {
                    return parentInjector;
                }

                //injector exists
                if(this.injectors.length == (datumIndex + 1))
                {
                    return this.injectors[datumIndex] as Injector;
                }

                const injector: Injector = Injector.create(
                {
                    providers:
                    [
                        <ValueProvider>
                        {
                            provide: SCOPE_IDENTIFIER,
                            useValue: scopeIdentifier,
                        },
                        <FactoryProvider>
                        {
                            provide: RelationsComponentManager,
                            useFactory: () => inject(RelationsComponentManager, {skipSelf: true}).openScope(inject(SCOPE_ID))
                        },
                        <FactoryProvider>
                        {
                            provide: RelationsProcessor,
                            useFactory: () => inject(RelationsProcessor, {skipSelf: true}).openScope(inject(SCOPE_ID), inject(RelationsComponentManager), inject(Injector))
                        },
                        RelationsChangeDetector,
                        LayoutRenderer,
                    ],
                    parent: viewContainer?.injector,
                });

                const relationsHelper = new GridColumnsRelationsHelper(injector);

                const changes: SimpleChanges = {};
                addSimpleChange<GridColumnsRelationsHelper>(changes, 'row', datum, null, true);
                relationsHelper.row = datum;
                relationsHelper.dynamicOnChanges(changes);

                this.injectors[datumIndex] = injector;
                this.relationsHelpers[datumIndex] = relationsHelper;

                return injector;
            };

            this.renderRowContainer(metadata?.contentRowContainer?.length ? metadata?.contentRowContainer : [{template: this.defaultsSafe.contentRowContainer, predicate: null, columns: null, exclude: false}],
                                    column => column.bodyTemplate,
                                    this.renderContentOrFooterCell,
                                    (_, columns) => this.getGridDataRowContext(datumIndex, datum, columns));
        }

        this.parentInjectorFn = null;
    }

    /**
     * @inheritdoc
     */
    protected override createInjector(injector: Injector, additionalProviders: Provider[] = []): Injector
    {
        if(this.parentInjectorFn)
        {
            injector = this.parentInjectorFn(injector);
        }

        return Injector.create(
        {
            providers:
            [
                ...additionalProviders,
            ],
            parent: injector,
        });
    }
}