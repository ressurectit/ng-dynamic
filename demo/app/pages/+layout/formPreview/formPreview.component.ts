import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Injector, ValueProvider, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {FormComponentControlBuilder, FORM_COMPONENT_CONTROL} from '@anglr/dynamic/form';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor} from '@anglr/dynamic/layout-editor';

import {StoreDataService} from '../../../services/storeData';

/**
 * Form preview component
 */
@Component(
{
    selector: 'form-preview-view',
    templateUrl: 'formPreview.component.html',
    providers:
    [
        FormComponentControlBuilder,
        LayoutComponentsIteratorService,
        LayoutEditorMetadataExtractor,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'form-preview')
@ComponentRoute({path: 'form-preview'})
@ComponentRoute({path: 'form-preview/:id'})
export class FormPreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _formInjector: Injector;

    protected _available: FormControl = new FormControl('');

    protected _metadata: LayoutComponentMetadata = null;

    protected _formGroup: FormGroup;

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _store: StoreDataService,
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
                this._metadata = this._store.getData(id);
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

            this._available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/layout', 'form-preview', val], {skipLocationChange: false, replaceUrl: true});
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
