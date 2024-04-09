import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ComponentRoute} from '@anglr/common/router';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {NgSelectModule} from '@anglr/select';
import {provideDynamic} from '@anglr/dynamic';
import {withCustomComponents, withCustomRelations, withLayoutRelationsRuntime} from '@anglr/dynamic/layout-relations';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective, withLayoutMetadataStorage} from '@anglr/dynamic/layout';
import {RelationsManager, withRelationsMetadataStorage} from '@anglr/dynamic/relations';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withGridComponents} from '@anglr/dynamic/grid-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {withFormComponents} from '@anglr/dynamic/form';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {StaticInputSAComponent, StaticOutputSAComponent} from '../misc';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';
import {MetadataStorageLayoutComplex} from '../../../services/metadataStorageLayoutComplex';
import {MetadataStorageRelationsComplex} from '../../../services/metadataStorageRelationsComplex';
import {DemoCustomRelationsRegister} from '../../../services/demoCustomRelationsRegister';

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
        LayoutComponentRendererSADirective,
        RouterLink,
        ReactiveFormsModule,
        NgSelectModule,
        DebugDataCopyClickModule,
        StaticInputSAComponent,
        StaticOutputSAComponent,
// ShowRelationsDebuggerSADirective,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsRuntime(),
                       withCustomComponents(DemoCustomComponentsRegister),
                       withCustomRelations(DemoCustomRelationsRegister),
                       withLayoutMetadataStorage(MetadataStorageLayoutComplex),
                       withRelationsMetadataStorage(MetadataStorageRelationsComplex),
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
                this.router.navigate(['/layoutRelationsAllFeatures/preview', val], {skipLocationChange: false, replaceUrl: true});
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
