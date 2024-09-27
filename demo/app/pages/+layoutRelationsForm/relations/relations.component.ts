import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {GoBackDirective} from '@anglr/common';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, RelationsEditorSAComponent} from '@anglr/dynamic/relations-editor';
import {LayoutManager, withLayoutRelationsEditor} from '@anglr/dynamic/layout-relations';
import {withFormComponents} from '@anglr/dynamic/form';
import {MetadataHistoryManager, provideDynamic, withEditorHotkeys, withPackageManager} from '@anglr/dynamic';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';
import {LoadSaveNewComponent} from '../../../components';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'form-relations-editor-view',
    templateUrl: 'relations.component.html',
    standalone: true,
    imports:
    [
        GoBackDirective,
        LoadSaveNewComponent,
        RelationsEditorSAComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutRelationsEditor(),
                       withPackageManager(DemoRelationsPackageManager),
                       withEditorHotkeys(),
                       withBasicComponents(),
                       withFormComponents(),
                       withMaterialComponents(),),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
export class FormRelationsComponent
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
        this.metadata = DemoData.demoRelationsComplexRelations;
    }

    protected loadRestDemo(): void
    {
        this.metadata = DemoData.complexDemoRestRelations;
    }

    protected loadFullDemo(): void
    {
        this.metadata = DemoData.complexDemoFullRelations;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata|null): void
    {
        this.metadata = metadata?.relations ?? this.emptyMetadata;
        this.layoutManager.setLayout(metadata?.layout ?? null);
    }
}
