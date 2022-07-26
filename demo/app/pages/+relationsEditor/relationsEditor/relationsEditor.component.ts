import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
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
    // providers:
    // [
    //     DemoStorage,
    //     <ExistingProvider>
    //     {
    //         provide: MetadataStorage,
    //         useExisting: DemoStorage
    //     }
    // ],
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
    constructor(private _manager: RelationsNodeManager,
                protected _store: StoreDataService,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): RelationsNodeMetadata[]
    {
        return this._manager.getMetadata();
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.relationsDemo;
    }

    protected showMetadata(): void
    {
        const meta = this._getMetadata();

        this.stringMetadata = JSON.stringify(meta, null, 4);
    }
}
