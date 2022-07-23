import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager, LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {createStoreDataServiceFactory} from '../../../misc/factories';
import {StoreDataService} from '../../../services/storeData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        LayoutEditorMetadataManager,
        createStoreDataServiceFactory('LAYOUT_DATA'),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'editor'})
@ComponentRoute({path: 'editor/:id'})
export class EditorComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: LayoutComponentMetadata|null = null;

    protected get emptyMetadata(): LayoutComponentMetadata
    {
        return {
            id: `stackPanel-${generateId(10)}`,
            displayName: 'root',
            package: 'basic-components',
            name: 'stackPanel',
            options: <StackPanelComponentOptions>
            {
                children: [],
            },
        };
    }

    //######################### constructor #########################
    constructor(private _manager: LayoutEditorMetadataManager,
                protected _store: StoreDataService,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): LayoutComponentMetadata
    {
        return this._manager.getMetadata();
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoLayout;
    }
}
