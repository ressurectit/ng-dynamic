import {Component, ChangeDetectionStrategy, ClassProvider, FactoryProvider, Inject, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, provideRelationsDefaultOverride, REFRESH_PALETTE_OBSERVABLES} from '@anglr/dynamic/relations-editor';
import {LayoutManager, provideLayoutRelationsEditorWithStatic, provideEditorRelationsCustomComponents, provideEditorRelationsCustomRelations, CustomRelationsRegister, CustomDynamicItemsRegister} from '@anglr/dynamic/layout-relations';
import {provideTinyMceLayoutRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {provideCssLayoutRelationsEditor} from '@anglr/dynamic/css-components';
import {EditorHotkeys, MetadataHistoryManager, PackageManager} from '@anglr/dynamic';
import {provideBasicLayoutRelationsEditor} from '@anglr/dynamic/basic-components';
import {provideMaterialLayoutRelationsEditor} from '@anglr/dynamic/material-components';
import {provideMathLayoutRelationsEditor} from '@anglr/dynamic/math-components';
import {provideRestLayoutRelationsEditor} from '@anglr/dynamic/rest-components';
import {provideFormLayoutRelationsEditor} from '@anglr/dynamic/form';
import {provideGridLayoutRelationsEditor} from '@anglr/dynamic/grid-components';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {ComplexStaticRegister} from '../misc';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';
import {DemoRelationsDefaultsOverrideService} from '../../../services/demoDefaultsOverride';
import {DemoCustomRelationsRegister} from '../../../services/demoCustomRelationsRegister';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    providers:
    [
        EditorHotkeys,
        provideFormLayoutRelationsEditor(),
        provideBasicLayoutRelationsEditor(),
        provideHandlebarsLayoutRelationsEditor(),
        provideMaterialLayoutRelationsEditor(),
        provideRestLayoutRelationsEditor(),
        provideTinyMceLayoutRelationsEditor(),
        provideCssLayoutRelationsEditor(),
        provideMathLayoutRelationsEditor(),
        provideGridLayoutRelationsEditor(),
        provideEditorRelationsCustomComponents(provideLayoutRelationsEditorWithStatic(ComplexStaticRegister), DemoCustomComponentsRegister),
        provideEditorRelationsCustomRelations(DemoCustomRelationsRegister),
        provideRelationsDefaultOverride(DemoRelationsDefaultsOverrideService),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoRelationsPackageManager,
        },
        <ExistingProvider>
        {
            provide: CustomDynamicItemsRegister,
            useExisting: CustomRelationsRegister,
        },
        <FactoryProvider>
        {
            provide: REFRESH_PALETTE_OBSERVABLES,
            useFactory: (register: DemoCustomRelationsRegister) => register.registeredChange,
            deps: [CustomDynamicItemsRegister],
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected _store: StoreDataService<LayoutRelationsMetadata>,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                protected _layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(metadata: RelationsNodeMetadata[]): LayoutRelationsMetadata
    {
        return {
            relations: metadata
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexRelations;
    }

    protected _loadRestDemo(): void
    {
        this._metadata = DemoData.complexDemoRestRelations;
    }

    protected _loadFullDemo(): void
    {
        this._metadata = DemoData.complexDemoFullRelations;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata): void
    {
        this._metadata = metadata?.relations ?? this.emptyMetadata;
        this._layoutManager.setLayout(metadata?.layout);
    }
}
