import {Component, ChangeDetectionStrategy, ExistingProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataStorage} from '@anglr/dynamic';
import {BindThis, generateId} from '@jscrpt/common';
import prefixer  from 'postcss-prefix-selector';
import postcss, {Root} from 'postcss';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {DemoStorage} from '../../../services/metadataStorage';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
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
                protected store: StoreDataService,)
    {
        const out = postcss().use((root: Root) =>
        {
            const prefixedFn = prefixer(
            {
                prefix: '.some-selector',
            });

            prefixedFn(root);
        }).process(`
        body {
            background: red;
          }
          
          .a, .b {
            color: aqua;
          }
          
          .c {
            color: coral;
          }`).css;

        console.log(out);
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
