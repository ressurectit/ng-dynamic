import {Component, ChangeDetectionStrategy, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {LayoutManager, provideLayoutRelationsEditorWithStatic} from '@anglr/dynamic/layout-relations';
import {provideTinyMceLayoutRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {provideCssLayoutRelationsEditor} from '@anglr/dynamic/css-components';
import {MetadataStorage} from '@anglr/dynamic';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {ComplexStaticRegister} from '../misc';
import {DemoStorage} from '../../../services/metadataStorage';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    providers:
    [
        DemoStorage,
        <ExistingProvider>
        {
            provide: MetadataStorage,
            useExisting: DemoStorage
        },
        provideLayoutRelationsEditorWithStatic(ComplexStaticRegister),
        provideHandlebarsLayoutRelationsEditor(),
        provideTinyMceLayoutRelationsEditor(),
        provideCssLayoutRelationsEditor(),
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
    constructor(private _manager: RelationsNodeManager,
                protected _store: StoreDataService<LayoutRelationsMetadata>,
                protected _layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): LayoutRelationsMetadata
    {
        return {
            relations: this._manager.getMetadata()
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
