import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {GoBackDirective} from '@anglr/common';
import {ComponentRoute} from '@anglr/common/router';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LAYOUT_HISTORY_MANAGER, LayoutEditorComponent, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions, withBasicComponents} from '@anglr/dynamic/basic-components';
import {MetadataHistoryManager, provideDynamic, withEditorHotkeys, withPackageManager} from '@anglr/dynamic';
import {withFormComponents} from '@anglr/dynamic/form';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {BindThis, generateId} from '@jscrpt/common';

import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {DemoLayoutPackageManager} from '../../../services/demoLayoutPackageManager';
import {LoadSaveNewComponent} from '../../../components';
import {WithFullscreenContentCssClass} from '../../../decorators';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'form-layout-editor-view',
    templateUrl: 'layout.component.html',
    imports:
    [
        GoBackDirective,
        DebugDataCopyClickModule,
        LoadSaveNewComponent,
        LayoutEditorComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withPackageManager(DemoLayoutPackageManager),
                       withEditorHotkeys(),
                       withBasicComponents(),
                       withFormComponents(),
                       withMaterialComponents(),),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'layout'})
@ComponentRoute({path: 'layout/:id'})
@WithFullscreenContentCssClass()
export class FormLayoutComponent
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
            options: <Partial<StackPanelComponentOptions>>
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
}
