import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata, provideLayout} from '@anglr/dynamic/layout';
import {provideRelations, RelationsManager} from '@anglr/dynamic/relations';
import {CSS_LAYOUT_COMPONENTS_PROVIDER} from '@anglr/dynamic/css-components';
import {TINY_MCE_LAYOUT_COMPONENTS_PROVIDER} from '@anglr/dynamic/tinymce-components';
import {HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER, HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER} from '@anglr/dynamic/handlebars-components';

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
        provideLayout(),
        provideRelations(),
        CSS_LAYOUT_COMPONENTS_PROVIDER,
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
        HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
        HANDLEBARS_RELATIONS_COMPONENTS_PROVIDER,
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
                const meta = this._store.getData(id);
                this._metadata = meta?.layout;
                this._relationsManager.setRelations(meta.relations ?? []);
            }
            else
            {
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
