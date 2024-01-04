import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {provideLayoutRelationsCustomComponents} from '@anglr/dynamic/layout-relations';
import {RelationsManager} from '@anglr/dynamic/relations';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideCssLayoutRelations} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutRelations} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelations} from '@anglr/dynamic/handlebars-components';
import {provideMaterialLayoutRelations} from '@anglr/dynamic/material-components';
import {provideMathLayoutRelations} from '@anglr/dynamic/math-components';
import {provideBasicLayoutRelations} from '@anglr/dynamic/basic-components';
import {provideRestLayoutRelations} from '@anglr/dynamic/rest-components';
import {provideFormLayoutRelations} from '@anglr/dynamic/form';
import {provideGridLayoutRelations} from '@anglr/dynamic/grid-components';

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
        provideLayoutRelationsCustomComponents(),
        provideFormLayoutRelations(),
        provideBasicLayoutRelations(),
        provideMaterialLayoutRelations(),
        provideCssLayoutRelations(),
        provideTinyMceLayoutRelations(),
        provideHandlebarsLayoutRelations(),
        provideRestLayoutRelations(),
        provideMathLayoutRelations(),
        provideGridLayoutRelations(),
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

    protected relations: RelationsNodeMetadata[] = [];

    protected selectedMetadata: LayoutRelationsMetadata|null = null;

    protected availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private store: StoreDataService<LayoutRelationsMetadata>,
                private router: Router,
                private relationsManager: RelationsManager,
                private route: ActivatedRoute,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.availableNames = this.store.getStored();

        this.route.params.subscribe(({id}) =>
        {
            if(id)
            {
                this.available.setValue(id);
                const meta = this.selectedMetadata = this.store.getData(id);
                this.metadata = meta?.layout;
                this.relations = meta?.relations ?? [];
                this.relationsManager.setRelations(meta.relations ?? []);
            }
            else
            {
                this.selectedMetadata = null;
                this.relationsManager.setRelations([]);
            }

            this.available.valueChanges.subscribe(val =>
            {
                this.router.navigate(['/relationsComplex/preview', val], {skipLocationChange: false, replaceUrl: true});
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
