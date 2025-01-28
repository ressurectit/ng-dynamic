import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {GoBackDirective} from '@anglr/common';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, RelationsEditorSAComponent} from '@anglr/dynamic/relations-editor';
import {LayoutManager, withLayoutRelationsEditor} from '@anglr/dynamic/layout-relations';
import {MetadataHistoryManager, provideDynamic, withPackageManager} from '@anglr/dynamic';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {withGridComponents} from '@anglr/dynamic/grid-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withFormComponents} from '@anglr/dynamic/form';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {LoadSaveNewComponent} from '../../../components';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager';
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
        RelationsEditorSAComponent,
        LoadSaveNewComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsEditor(),
                       withPackageManager(DemoRelationsPackageManager),
                       withBasicComponents(),
                       withCssComponents(),
                       withFormComponents(),
                       withGridComponents(),
                       withHandlebarsComponents(),
                       withMaterialComponents(),
                       withMathComponents(),
                       withRestComponents(),
                       withTinyMceComponents(),)
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
@WithFullscreenContentCssClass()
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected store: StoreDataService<LayoutRelationsMetadata>,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                protected layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected getMetadata(metadata: RelationsNodeMetadata[]): LayoutRelationsMetadata
    {
        return {
            relations: metadata
        };
    }

    protected loadDemo(): void
    {
        this.metadata = DemoData.relationsWithLayoutDemo;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata|null): void
    {
        this.metadata = metadata?.relations ?? this.emptyMetadata;
        this.layoutManager?.setLayout(metadata?.layout ?? null);
    }
}
