import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@anglr/select';
import {ComponentRoute} from '@anglr/common/router';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
// import {provideCssLayoutRelations} from '@anglr/dynamic/css-components';
// import {provideTinyMceLayoutRelations} from '@anglr/dynamic/tinymce-components';
// import {provideHandlebarsLayoutRelations} from '@anglr/dynamic/handlebars-components';
// import {provideLayoutRelations} from '@anglr/dynamic/layout-relations';
// import {provideRestLayoutRelations} from '@anglr/dynamic/rest-components';
// import {provideBasicLayoutRelations} from '@anglr/dynamic/basic-components';
// import {provideMaterialLayoutRelations} from '@anglr/dynamic/material-components';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';

/**
 * Layout preview component
 */
@Component(
{
    selector: 'layout-preview-view',
    templateUrl: 'preview.component.html',
    standalone: true,
    imports:
    [
        RouterLink,
        NgSelectModule,
        ReactiveFormsModule,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime()),
        // provideLayoutRelations(),
        // provideBasicLayoutRelations(),
        // provideMaterialLayoutRelations(),
        // provideCssLayoutRelations(),
        // provideTinyMceLayoutRelations(),
        // provideHandlebarsLayoutRelations(),
        // provideRestLayoutRelations(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'preview'})
@ComponentRoute({path: 'preview/:id'})
export class PreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected available: FormControl = new FormControl('');

    protected metadata: LayoutComponentMetadata = null;

    protected availableNames: string[] = [];

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
        this.availableNames = this._store.getStored();

        this._route.params.subscribe(({id}) =>
        {
            if(id)
            {
                this.available.setValue(id);
                const meta = this._store.getData(id);
                this.metadata = meta?.layout;

                this._relationsManager.setRelations(meta.relations ?? []);
            }
            else
            {
                this._relationsManager.setRelations([]);
            }

            this.available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/relationsWithLayoutEditor/preview', val], {skipLocationChange: false, replaceUrl: true});
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
