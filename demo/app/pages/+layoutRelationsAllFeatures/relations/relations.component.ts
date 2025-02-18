import {Component, ChangeDetectionStrategy, Inject, inject, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {GoBackDirective} from '@anglr/common';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, RelationsEditorComponent, withStaticComponents, withRelationsDefaultsOverride} from '@anglr/dynamic/relations-editor';
import {LayoutManager, CustomDynamicItemsRegister, withLayoutRelationsEditor, withCustomComponents, withCustomRelations, CustomRelationsRegister} from '@anglr/dynamic/layout-relations';
import {MetadataHistoryManager, provideDynamic, withEditorHotkeys, withPackageManager} from '@anglr/dynamic';
import {withRelationsMetadataStorage} from '@anglr/dynamic/relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withGridComponents} from '@anglr/dynamic/grid-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {withFormComponents} from '@anglr/dynamic/form';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {ComplexStaticRegister} from '../misc';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';
import {DemoCustomRelationsRegister} from '../../../services/demoCustomRelationsRegister';
import {LoadSaveNewComponent} from '../../../components';
import {MetadataStorageRelationsComplex} from '../../../services/metadataStorageRelationsComplex';
import {DemoRelationsDefaultsOverrideService} from '../../../services/demoDefaultsOverride';
import {WithFullscreenContentCssClass} from '../../../decorators';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    imports:
    [
        GoBackDirective,
        LoadSaveNewComponent,
        RelationsEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsEditor(),
                       withPackageManager(DemoRelationsPackageManager),
                       withEditorHotkeys(),
                       withCustomComponents(DemoCustomComponentsRegister),
                       withRelationsDefaultsOverride(DemoRelationsDefaultsOverrideService),
                       withRelationsMetadataStorage(MetadataStorageRelationsComplex),
                       withCustomRelations(DemoCustomRelationsRegister, () => (inject(CustomDynamicItemsRegister) as DemoCustomRelationsRegister).registeredChange),
                       withStaticComponents(ComplexStaticRegister),
                       withBasicComponents(),
                       withCssComponents(),
                       withFormComponents(),
                       withGridComponents(),
                       withHandlebarsComponents(),
                       withMaterialComponents(),
                       withMathComponents(),
                       withRestComponents(),
                       withTinyMceComponents(),),
        <ExistingProvider>
        {
            provide: CustomDynamicItemsRegister,
            useExisting: CustomRelationsRegister,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
@WithFullscreenContentCssClass()
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected _store: StoreDataService<LayoutRelationsMetadata>,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                protected _layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(metadata: RelationsNodeMetadata[]): LayoutRelationsMetadata
    {
        return {
            relations: metadata
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexRelations;
    }

    protected _loadRestDemo(): void
    {
        this._metadata = DemoData.complexDemoRestRelations;
    }

    protected _loadFullDemo(): void
    {
        this._metadata = DemoData.complexDemoFullRelations;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata|null): void
    {
        this._metadata = metadata?.relations ?? this.emptyMetadata;
        this._layoutManager.setLayout(metadata?.layout ?? null);
    }
}
