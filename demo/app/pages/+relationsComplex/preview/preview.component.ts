import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, FactoryProvider} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {provideLayoutRelationsCustomComponents} from '@anglr/dynamic/layout-relations';
import {RelationsManager, RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideCssLayoutRelations} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutRelations} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelations} from '@anglr/dynamic/handlebars-components';
import {provideRestLayoutRelations} from '@anglr/dynamic/rest-components';
import {MetadataStorage} from '@anglr/dynamic';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';

/**
 * Layout preview component
 */
@Component(
{
    selector: 'layout-preview-view',
    templateUrl: 'preview.component.html',
    providers:
    [
        <FactoryProvider>
        {
            provide: LAYOUT_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutRelationsMetadata>) => new MetadataStorage<LayoutComponentMetadata>(id => store.getData(id)?.layout),
            deps: [StoreDataService]
        },
        <FactoryProvider>
        {
            provide: RELATIONS_METADATA_STORAGE,
            useFactory: (store: StoreDataService<LayoutRelationsMetadata>) => new MetadataStorage<RelationsNodeMetadata[]>(id => store.getData(id)?.relations),
            deps: [StoreDataService]
        },
        provideLayoutRelationsCustomComponents(),
        provideCssLayoutRelations(),
        provideTinyMceLayoutRelations(),
        provideHandlebarsLayoutRelations(),
        provideRestLayoutRelations(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'preview'})
@ComponentRoute({path: 'preview/:id'})
export class PreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _available: FormControl = new FormControl('');

    protected _metadata: LayoutComponentMetadata = null;

    protected selectedMetadata: LayoutRelationsMetadata|null = null;

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _store: StoreDataService<LayoutRelationsMetadata>,
                private _router: Router,
                private _relationsManager: RelationsManager,
                private _route: ActivatedRoute,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._availableNames = this._store.getStored();

        this._route.params.subscribe(({id}) =>
        {
            if(id)
            {
                this._available.setValue(id);
                const meta = this.selectedMetadata = this._store.getData(id);
                this._metadata = meta?.layout;
                this._relationsManager.setRelations(meta.relations ?? []);
            }
            else
            {
                this.selectedMetadata = null;
                this._relationsManager.setRelations([]);
            }

            this._available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/relationsComplex/preview', val], {skipLocationChange: false, replaceUrl: true});
            });
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }
}
