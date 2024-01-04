import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {GoBackSADirective} from '@anglr/common';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LAYOUT_HISTORY_MANAGER, LayoutEditorSAComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataHistoryManager, provideDynamic, withPackageManager} from '@anglr/dynamic';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoLayoutPackageManager} from '../../../services/demoLayoutPackageManager';
import {LoadSaveNewSAComponent} from '../../../components';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'layout.component.html',
    standalone: true,
    imports:
    [
        GoBackSADirective,
        LayoutEditorSAComponent,
        LoadSaveNewSAComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withPackageManager(DemoLayoutPackageManager),
                       withBasicComponents(),
                       withMaterialComponents(),
                       withCssComponents(),
                       withTinyMceComponents(),
                       withHandlebarsComponents(),),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'layout'})
@ComponentRoute({path: 'layout/:id'})
export class LayoutComponent
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
    constructor(protected store: StoreDataService<LayoutRelationsMetadata>,
        
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected getMetadata(metadata: LayoutComponentMetadata): LayoutRelationsMetadata
    {
        return {
            layout: metadata
        };
    }

    protected loadDemo(): void
    {
        this.metadata = DemoData.demoLayoutWithRelations;
    }
}
