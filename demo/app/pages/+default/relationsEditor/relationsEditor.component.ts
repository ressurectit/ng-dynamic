import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeDragData, RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {createStoreDataServiceFactory} from '../../../misc/factories';
import {StoreDataService} from '../../../services/storeData';

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
        createStoreDataServiceFactory('RELATIONS_DATA'),
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

    protected addNode(event: CdkDragDrop<RelationsNodeDragData, RelationsNodeDragData, RelationsNodeDragData>): void
    {
        //TODO: apply transform of canvas

        const canvasRect = event.container.element.nativeElement.getBoundingClientRect();

        event.item.data.metadata.nodeMetadata.coordinates.x = event.dropPoint.x - canvasRect.x;
        event.item.data.metadata.nodeMetadata.coordinates.y = event.dropPoint.y - canvasRect.y;

        this._metadata =
        [
            ...this._metadata,
            event.item.data.metadata,
        ];
    }
}
