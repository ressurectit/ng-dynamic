import {Component, ChangeDetectionStrategy, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {LayoutManager} from '@anglr/dynamic/layout-relations';
import {MetadataStorage} from '@anglr/dynamic';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoStorage} from '../../../services/metadataStorage';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    providers:
    [
        DemoStorage,
        <ExistingProvider>
        {
            provide: MetadataStorage,
            useExisting: DemoStorage
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(private _manager: RelationsNodeManager,
                protected _store: StoreDataService<LayoutRelationsMetadata>,
                protected _layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): LayoutRelationsMetadata
    {
        return {
            relations: this._manager.getMetadata()
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexRelations;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata): void
    {
        this._metadata = metadata?.relations ?? this.emptyMetadata;
        this._layoutManager.setLayout(metadata?.layout);
    }
}
