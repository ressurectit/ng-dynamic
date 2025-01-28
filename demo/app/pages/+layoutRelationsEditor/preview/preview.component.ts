import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@anglr/select';
import {ComponentRoute} from '@anglr/common/router';
import {provideDynamic} from '@anglr/dynamic';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {RelationsManager} from '@anglr/dynamic/relations';
import {withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withGridComponents} from '@anglr/dynamic/grid-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {withFormComponents} from '@anglr/dynamic/form';
import {DebugDataCopyClickModule} from '@anglr/common/material';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {WithFullscreenContentCssClass} from '../../../decorators';

/**
 * Layout preview component
 */
@Component(
{
    selector: 'layout-preview-view',
    templateUrl: 'preview.component.html',
    imports:
    [
        RouterLink,
        NgSelectModule,
        ReactiveFormsModule,
        LayoutComponentRendererSADirective,
        DebugDataCopyClickModule,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withBasicComponents(),
                       withCssComponents(),
                       withFormComponents(),
                       withGridComponents(),
                       withHandlebarsComponents(),
                       withMaterialComponents(),
                       withMathComponents(),
                       withRestComponents(),
                       withTinyMceComponents(),),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'preview'})
@ComponentRoute({path: 'preview/:id'})
@WithFullscreenContentCssClass()
export class PreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected available: FormControl = new FormControl('');

    protected metadata: LayoutComponentMetadata|undefined|null = null;

    protected allMetadata: LayoutRelationsMetadata|undefined|null;

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
                const meta = this.allMetadata = this._store.getData(id);
                this.metadata = meta?.layout;

                this._relationsManager.setRelations(meta?.relations ?? []);
            }
            else
            {
                this._relationsManager.setRelations([]);
            }

            this.available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/layoutRelationsEditor/preview', val], {skipLocationChange: false, replaceUrl: true});
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
