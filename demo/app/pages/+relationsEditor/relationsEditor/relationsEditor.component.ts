import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, RelationsEditorSAComponent, withRelationsEditor} from '@anglr/dynamic/relations-editor';
import {MetadataHistoryManager, EditorMetadataManager, EDITOR_METADATA_MANAGER, provideDynamic, withPackageManager} from '@anglr/dynamic';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LoadSaveNewSAComponent} from '../../../components';
import {createStoreDataServiceFactory} from '../../../misc/factories';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relationsEditor.component.html',
    standalone: true,
    imports:
    [
        LoadSaveNewSAComponent,
        RelationsEditorSAComponent,
        DebugDataCopyClickModule,
    ],
    providers:
    [
        createStoreDataServiceFactory('RELATIONS_DATA'),
        provideDynamic([withRelationsEditor()],
                       withPackageManager(DemoRelationsPackageManager),
                       withBasicComponents(),
                       withMathComponents(),
                       withTinyMceComponents(),
                       withHandlebarsComponents(),
                       withRestComponents(),)
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: ''})
@ComponentRoute({path: ':id'})
export class RelationsEditorComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: RelationsNodeMetadata[] = [];

    protected stringMetadata: string = '';

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected store: StoreDataService,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                @Inject(EDITOR_METADATA_MANAGER) protected metadataState: EditorMetadataManager<RelationsNodeMetadata[]>,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected getMetadata(metadata: RelationsNodeMetadata[]): RelationsNodeMetadata[]
    {
        return metadata;
    }

    protected loadDemo(): void
    {
        this.metadata = DemoData.relationsDemo;
    }

    protected showMetadata(): void
    {
        const meta = this.metadataState.getMetadata();

        this.stringMetadata = JSON.stringify(meta, null, 4);
    }
}
