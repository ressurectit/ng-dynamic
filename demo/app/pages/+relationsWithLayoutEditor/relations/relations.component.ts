import {Component, ChangeDetectionStrategy, ClassProvider, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER} from '@anglr/dynamic/relations-editor';
import {LayoutManager, provideLayoutRelationsEditor} from '@anglr/dynamic/layout-relations';
import {provideCssLayoutRelationsEditor} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {EditorHotkeys, MetadataHistoryManager, PackageManager} from '@anglr/dynamic';
import {provideRestLayoutRelationsEditor} from '@anglr/dynamic/rest-components';
import {provideBasicLayoutRelationsEditor} from '@anglr/dynamic/basic-components';
import {provideMaterialLayoutRelationsEditor} from '@anglr/dynamic/material-components';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';

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
        provideLayoutRelationsEditor(),
        provideBasicLayoutRelationsEditor(),
        provideMaterialLayoutRelationsEditor(),
        provideHandlebarsLayoutRelationsEditor(),
        provideRestLayoutRelationsEditor(),
        provideTinyMceLayoutRelationsEditor(),
        provideCssLayoutRelationsEditor(),
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
        this._metadata = DemoData.relationsWithLayoutDemo;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata): void
    {
        this._metadata = metadata?.relations ?? this.emptyMetadata;
        this._layoutManager.setLayout(metadata?.layout);
    }
}
