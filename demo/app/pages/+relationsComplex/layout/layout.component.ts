import {Component, ChangeDetectionStrategy, ExistingProvider, ClassProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager, provideLayoutEditor} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataStorage, PackageManager} from '@anglr/dynamic';
import {provideCssLayoutEditor} from '@anglr/dynamic/css-components';
import {provideTinyMceLayoutEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsLayoutEditor} from '@anglr/dynamic/handlebars-components';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoStorage} from '../../../services/metadataStorage';
import {DemoPackageManager} from '../../../services/demoPackageManager/demoPackageManager.service';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'layout.component.html',
    providers:
    [
        DemoStorage,
        <ExistingProvider>
        {
            provide: MetadataStorage,
            useExisting: DemoStorage
        },
        provideLayoutEditor(),
        provideCssLayoutEditor(),
        provideTinyMceLayoutEditor(),
        provideHandlebarsLayoutEditor(),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoPackageManager,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'layout'})
@ComponentRoute({path: 'layout/:id'})
export class LayoutComponent
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
                protected _store: StoreDataService<LayoutRelationsMetadata>,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): LayoutRelationsMetadata
    {
        return {
            layout: this._manager.getMetadata()
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexLayout;
    }

    protected _loadRestDemo(): void
    {
        this._metadata = DemoData.complexDemoRestLayout;
    }

    protected _loadFullDemo(): void
    {
        this._metadata = DemoData.complexDemoFullLayout;
    }
}
