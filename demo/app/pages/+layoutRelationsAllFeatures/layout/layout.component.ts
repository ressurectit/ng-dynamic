import {Component, ChangeDetectionStrategy, ClassProvider, FactoryProvider, Inject, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LAYOUT_HISTORY_MANAGER, provideLayoutDefaultsOverride, provideLayoutEditor, REFRESH_PALETTE_OBSERVABLES} from '@anglr/dynamic/layout-editor';
import {provideBasicLayoutEditor, StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {EditorHotkeys, MetadataHistoryManager, PackageManager} from '@anglr/dynamic';
import {provideMaterialLayoutEditor} from '@anglr/dynamic/material-components';
import {provideCssLayoutEditor} from '@anglr/dynamic/css-components';
import {provideGridLayoutEditor} from '@anglr/dynamic/grid-components';
import {provideTinyMceLayoutEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutEditor} from '@anglr/dynamic/handlebars-components';
import {CustomComponentsRegister, CustomDynamicItemsRegister, provideEditorLayoutCustomComponents} from '@anglr/dynamic/layout-relations';
import {provideFormLayoutEditor} from '@anglr/dynamic/form';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoLayoutPackageManager} from '../../../services/demoLayoutPackageManager/demoLayoutPackageManager.service';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';
import {DemoLayoutDefaultsOverrideService} from '../../../services/demoDefaultsOverride';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'layout.component.html',
    providers:
    [
        EditorHotkeys,
        provideLayoutEditor(),
        provideFormLayoutEditor(),
        provideBasicLayoutEditor(),
        provideGridLayoutEditor(),
        provideMaterialLayoutEditor(),
        provideCssLayoutEditor(),
        provideTinyMceLayoutEditor(),
        provideHandlebarsLayoutEditor(),
        provideEditorLayoutCustomComponents([], DemoCustomComponentsRegister),
        provideLayoutDefaultsOverride(DemoLayoutDefaultsOverrideService),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoLayoutPackageManager,
        },
        <ExistingProvider>
        {
            provide: CustomDynamicItemsRegister,
            useExisting: CustomComponentsRegister,
        },
        <FactoryProvider>
        {
            provide: REFRESH_PALETTE_OBSERVABLES,
            useFactory: (register: DemoCustomComponentsRegister) => register.registeredChange,
            deps: [CustomDynamicItemsRegister],
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'layout'})
@ComponentRoute({path: 'layout/:id'})
export class LayoutComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: LayoutComponentMetadata|null = null;

    protected get emptyMetadata(): LayoutComponentMetadata
    {
        return {
            id: `stackPanel-${generateId(10)}`,
            displayName: 'root',
            package: 'basic-components',
            name: 'stackPanel',
            options: <StackPanelComponentOptions>
            {
                children: [],
            },
        };
    }

    //######################### constructor #########################
    constructor(protected _store: StoreDataService<LayoutRelationsMetadata>,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(metadata: LayoutComponentMetadata): LayoutRelationsMetadata
    {
        return {
            layout: metadata
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexLayout;
    }

    protected _loadRestDemo(): void
    {
        this._metadata = DemoData.complexDemoRestLayout;
    }

    protected _loadFullDemo(): void
    {
        this._metadata = DemoData.complexDemoFullLayout;
    }
}
