import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {BindThis} from '@jscrpt/common';

import {RelationsDataService} from '../../../services/relationsData';
import {DemoData} from '../../../services/demoData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relationsEditor.component.html',
    providers:
    [
        RelationsNodeManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations-editor'})
@ComponentRoute({path: 'relations-editor/:id'})
export class RelationsEditorComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(private _manager: RelationsNodeManager,
                protected _store: RelationsDataService,)
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
}
