import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {LAYOUT_HISTORY_MANAGER} from '@anglr/dynamic/layout-editor';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
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
    constructor(protected store: StoreDataService,
        
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(metadata: LayoutComponentMetadata): LayoutComponentMetadata
    {
        return metadata;
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoLayout;
    }
}
