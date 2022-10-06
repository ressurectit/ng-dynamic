import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Injector, ValueProvider, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {FormComponentControlBuilder, FORM_COMPONENT_CONTROL, provideFormLayout} from '@anglr/dynamic/form';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor} from '@anglr/dynamic/layout-editor';
import {provideBasicLayout} from '@anglr/dynamic/basic-components';
import {provideMaterialLayout} from '@anglr/dynamic/material-components';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {RelationsManager} from '../../../../../relations/src';
import {provideLayoutRelations} from '../../../../../layout-relations/src';

/**
 * Form preview component
 */
@Component(
{
    selector: 'form-preview-view',
    templateUrl: 'preview.component.html',
    providers:
    [
        FormComponentControlBuilder,
        LayoutComponentsIteratorService,
        LayoutEditorMetadataExtractor,
        provideLayoutRelations(),
        provideBasicLayout(),
        provideMaterialLayout(),
        provideFormLayout(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'form-preview')
@ComponentRoute({path: 'form-preview'})
@ComponentRoute({path: 'form-preview/:id'})
export class FormPreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################
    
    protected selectedMetadata: LayoutRelationsMetadata|null = null;

    protected _formInjector: Injector;

    protected _available: FormControl = new FormControl('');

    protected _metadata: LayoutComponentMetadata = null;

    protected _formGroup: FormGroup;

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _relationsManager: RelationsManager,
                private _store: StoreDataService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _injector: Injector,
                private _formComponentControlBuilder: FormComponentControlBuilder,
                private _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._availableNames = this._store.getStored();

        this._route.params.subscribe(async ({id}) =>
        {
            if(id)
            {
                this._available.setValue(id);
                const meta = this.selectedMetadata = this._store.getData(id);
                this._metadata = meta?.layout;
                this._relationsManager.setRelations(meta.relations ?? []);

                this._formGroup = await this._formComponentControlBuilder.build(this._metadata);        
                this._formInjector = Injector.create(
                    {
                        parent: this._injector,
                        providers:
                        [
                            <ValueProvider>
                            {
                                provide: FORM_COMPONENT_CONTROL,
                                useValue: this._formGroup,
                            }
                        ]
                    }
                );
                this._changeDetector.detectChanges();
            }
            else
            {
                this.selectedMetadata = null;
                this._relationsManager.setRelations([]);
            }

            this._available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/relationsLayoutForm', 'form-preview', val], {skipLocationChange: false, replaceUrl: true});
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

    //######################### protected methods #########################

    /**
     * Form submission
     */
    protected _submit(): void
    {
        console.log(this._formGroup.value);
    }
}
