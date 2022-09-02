import {Component, ChangeDetectionStrategy, ClassProvider, FactoryProvider, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER} from '@anglr/dynamic/relations-editor';
import {LayoutManager, provideLayoutRelationsEditorWithStatic, provideEditorRelationsCustomComponents} from '@anglr/dynamic/layout-relations';
import {provideTinyMceLayoutRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {provideCssLayoutRelationsEditor} from '@anglr/dynamic/css-components';
import {EditorHotkeys, MetadataHistoryManager, MetadataStorage, PackageManager} from '@anglr/dynamic';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {ComplexStaticRegister} from '../misc';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';

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
        <FactoryProvider>
        {
            provide: RELATIONS_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutRelationsMetadata>) => new MetadataStorage<RelationsNodeMetadata[]>(id => store.getData(id)?.relations),
            deps: [StoreDataService]
        },
        provideHandlebarsLayoutRelationsEditor(),
        provideTinyMceLayoutRelationsEditor(),
        provideCssLayoutRelationsEditor(),
        provideEditorRelationsCustomComponents(provideLayoutRelationsEditorWithStatic(ComplexStaticRegister), DemoCustomComponentsRegister),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoRelationsPackageManager,
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
