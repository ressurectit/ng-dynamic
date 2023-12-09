import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, FactoryProvider} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {DynamicLayoutRelationsEditorModule, provideLayoutRelationsCustomComponents} from '@anglr/dynamic/layout-relations';
import {RelationsManager, RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideCssLayoutRelations} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutRelations} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutRelations} from '@anglr/dynamic/handlebars-components';
import {provideMaterialLayoutRelations} from '@anglr/dynamic/material-components';
import {provideMathLayoutRelations} from '@anglr/dynamic/math-components';
import {provideBasicLayoutRelations} from '@anglr/dynamic/basic-components';
import {provideRestLayoutRelations} from '@anglr/dynamic/rest-components';
import {ShowRelationsDebuggerSADirective} from '@anglr/dynamic/relations-debugger';
import {provideFormLayoutRelations} from '@anglr/dynamic/form';
import {MetadataStorage} from '@anglr/dynamic';
import {NgSelectModule} from '@anglr/select';
import {DebugDataCopyClickModule} from '@anglr/common/material';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {StaticInputSAComponent, StaticOutputSAComponent} from '../misc';
import {createStoreDataServiceFactory} from '../../../misc/factories';

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
        provideFormLayoutRelations(),
        provideBasicLayoutRelations(),
        provideMaterialLayoutRelations(),
        provideCssLayoutRelations(),
        provideTinyMceLayoutRelations(),
        provideHandlebarsLayoutRelations(),
        provideRestLayoutRelations(),
        provideMathLayoutRelations(),
        createStoreDataServiceFactory('LAYOUT_RELATIONS_COMPLEX_DATA'),
    ],
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
        RouterModule,
        NgSelectModule,
        DynamicLayoutRelationsEditorModule,
        DebugDataCopyClickModule,
        StaticInputSAComponent,
        StaticOutputSAComponent,
        ShowRelationsDebuggerSADirective,
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
                this.router.navigate(['/relationsComplexNew/preview', val], {skipLocationChange: false, replaceUrl: true});
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
