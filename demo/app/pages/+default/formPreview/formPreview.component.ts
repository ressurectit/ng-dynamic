import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Injector, ValueProvider} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager} from '@anglr/dynamic/layout-editor';
import {FORM_COMPONENT_CONTROL} from '@anglr/dynamic/form';

import {LayoutDataService} from '../../../services/layoutData';

/**
 * Form preview component
 */
@Component(
{
    selector: 'form-preview-view',
    templateUrl: 'formPreview.component.html',
    providers:
    [
        LayoutEditorMetadataManager,
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
    constructor(private _store: LayoutDataService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _fb: FormBuilder,
                private _injector: Injector,)
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
                this._metadata = this._store.getData(id);

                //TODO build formGroup from metadata
                this._formGroup = this._fb.group({
                    checkbox: true,
                    datepicker: new Date(),
                    number: 10,
                    period: '202201',
                    radio: null,
                    select: 'foo',
                    textarea: 'Text in textarea',
                    text: 'classic input field'
                });
        
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
            }

            this._available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/form-preview', val], {skipLocationChange: false, replaceUrl: true});
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

    protected _submit()
    {
        console.log(this._formGroup.value);
    }
}
