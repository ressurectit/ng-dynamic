import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, FactoryProvider, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {NgSelectModule} from '@anglr/select';
import {MetadataStorage, provideDynamic} from '@anglr/dynamic';
import {LAYOUT_METADATA_STORAGE, LayoutComponentMetadata, LayoutComponentRendererSADirective, withLayoutRuntime} from '@anglr/dynamic/layout';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withFormComponents} from '@anglr/dynamic/form';

import {StoreDataService} from '../../../services/storeData';
import {createStoreDataServiceFactory} from '../../../misc/factories';

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
        ReactiveFormsModule,
        NgSelectModule,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        //TODO: rework for function
        <FactoryProvider>
        {
            provide: LAYOUT_METADATA_STORAGE,
            useFactory: () => new MetadataStorage<LayoutComponentMetadata>(id => inject(StoreDataService<LayoutComponentMetadata>).getData(id)),
        },
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideDynamic([withLayoutRuntime()],
                       withBasicComponents(),
                       withMaterialComponents(),
                       withCssComponents(),
                       withTinyMceComponents(),
                       withHandlebarsComponents(),
                       withFormComponents(),),
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
    constructor(private store: StoreDataService,
                private router: Router,
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
                this.metadata = this.store.getData(id);
            }

            this.available.valueChanges.subscribe(val =>
            {
                this.router.navigate(['/layout/preview', val], {skipLocationChange: false, replaceUrl: true});
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
