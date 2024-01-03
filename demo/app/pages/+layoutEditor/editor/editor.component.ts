import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataHistoryManager, provideDynamic, withPackageManager} from '@anglr/dynamic';
import {LAYOUT_HISTORY_MANAGER, LayoutEditorSAComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withFormComponents} from '@anglr/dynamic/form';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LoadSaveNewSAComponent} from '../../../components';
import {createStoreDataServiceFactory} from '../../../misc/factories';
import {DemoLayoutPackageManager} from '../../../services/demoLayoutPackageManager';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
    standalone: true,
    imports:
    [
        LoadSaveNewSAComponent,
        LayoutEditorSAComponent,
        DebugDataCopyClickModule,
    ],
    providers:
    [
        createStoreDataServiceFactory('LAYOUT_DATA'),
        provideDynamic([withLayoutEditor()],
                       withPackageManager(DemoLayoutPackageManager),
                       withBasicComponents(),
                       withMaterialComponents(),
                       withCssComponents(),
                       withTinyMceComponents(),
                       withHandlebarsComponents(),
                       withFormComponents(),),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'editor'})
@ComponentRoute({path: 'editor/:id'})
export class EditorComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: LayoutComponentMetadata|null = null;

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
    protected getMetadata(metadata: LayoutComponentMetadata): LayoutComponentMetadata
    {
        return metadata;
    }

    protected loadDemo(): void
    {
        this.metadata = DemoData.demoLayout;
    }
}
