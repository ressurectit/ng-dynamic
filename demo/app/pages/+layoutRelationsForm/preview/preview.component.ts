import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, Injector, ValueProvider, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@anglr/select';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {provideDynamic} from '@anglr/dynamic';
import {FormComponentControlBuilder, FORM_COMPONENT_CONTROL, withFormComponents, withFormControlBuilder} from '@anglr/dynamic/form';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';

/**
 * Form preview component
 */
@Component(
{
    selector: 'form-preview-view',
    templateUrl: 'preview.component.html',
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
        NgSelectModule,
        RouterLink,
        DebugDataCopyClickModule,
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withBasicComponents(),
                       withFormComponents(),
                       withMaterialComponents(),
                       withFormControlBuilder()),
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

    protected formInjector: Injector;

    protected available: FormControl = new FormControl('');

    protected metadata: LayoutComponentMetadata = null;

    protected formGroup: FormGroup;

    protected availableNames: string[] = [];

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
        this.availableNames = this._store.getStored();

        this._route.params.subscribe(async ({id}) =>
        {
            if(id)
            {
                this.available.setValue(id);
                const meta = this.selectedMetadata = this._store.getData(id);
                this.metadata = meta?.layout;
                this._relationsManager.setRelations(meta.relations ?? []);

                this.formGroup = await this._formComponentControlBuilder.build(this.metadata);        
                this.formInjector = Injector.create(
                    {
                        parent: this._injector,
                        providers:
                        [
                            <ValueProvider>
                            {
                                provide: FORM_COMPONENT_CONTROL,
                                useValue: this.formGroup,
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

            this.available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/layoutRelationsForm', 'form-preview', val], {skipLocationChange: false, replaceUrl: true});
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
    protected submit(): void
    {
        console.log(this.formGroup.value);
    }
}
