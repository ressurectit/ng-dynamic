import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER} from '@anglr/dynamic/relations-editor';
import {MetadataHistoryManager, EditorMetadataManager, EDITOR_METADATA_MANAGER} from '@anglr/dynamic';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relationsEditor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: ''})
@ComponentRoute({path: ':id'})
export class RelationsEditorComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected stringMetadata: string = '';

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected _store: StoreDataService,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                @Inject(EDITOR_METADATA_MANAGER) protected _metadataState: EditorMetadataManager<RelationsNodeMetadata[]>,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(metadata: RelationsNodeMetadata[]): RelationsNodeMetadata[]
    {
        return metadata;
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.relationsDemo;
    }

    protected showMetadata(): void
    {
        const meta = this._metadataState.getMetadata();

        this.stringMetadata = JSON.stringify(meta, null, 4);
    }
}
