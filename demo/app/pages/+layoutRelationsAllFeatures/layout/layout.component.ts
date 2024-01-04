import {Component, ChangeDetectionStrategy, Inject, ExistingProvider, inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {GoBackSADirective} from '@anglr/common';
import {DebugDataCopyClickModule} from '@anglr/common/material';
import {LayoutComponentMetadata, withLayoutMetadataStorage} from '@anglr/dynamic/layout';
import {LAYOUT_HISTORY_MANAGER, LayoutEditorSAComponent, withLayoutDefaultsOverride, withLayoutEditor} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {MetadataHistoryManager, provideDynamic, withEditorHotkeys, withPackageManager} from '@anglr/dynamic';
import {CustomComponentsRegister, CustomDynamicItemsRegister, withCustomComponents, withCustomRelations} from '@anglr/dynamic/layout-relations';
import {withBasicComponents} from '@anglr/dynamic/basic-components';
import {withMaterialComponents} from '@anglr/dynamic/material-components';
import {withCssComponents} from '@anglr/dynamic/css-components';
import {withTinyMceComponents} from '@anglr/dynamic/tinymce-components';
import {withHandlebarsComponents} from '@anglr/dynamic/handlebars-components';
import {withGridComponents} from '@anglr/dynamic/grid-components';
import {withMathComponents} from '@anglr/dynamic/math-components';
import {withRestComponents} from '@anglr/dynamic/rest-components';
import {withFormComponents} from '@anglr/dynamic/form';
import {BindThis, generateId} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {LoadSaveNewSAComponent} from '../../../components';
import {DemoLayoutPackageManager} from '../../../services/demoLayoutPackageManager';
import {DemoCustomComponentsRegister} from '../../../services/demoCustomComponentsRegister';
import {DemoLayoutDefaultsOverrideService} from '../../../services/demoDefaultsOverride';
import {MetadataStorageLayoutComplex} from '../../../services/metadataStorageLayoutComplex';

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
        DebugDataCopyClickModule,
        LoadSaveNewSAComponent,
        LayoutEditorSAComponent,
    ],
    providers:
    [
        provideDynamic(withLayoutEditor(),
                       withPackageManager(DemoLayoutPackageManager),
                       withEditorHotkeys(),
                       withCustomComponents(DemoCustomComponentsRegister, () => (inject(CustomDynamicItemsRegister) as DemoCustomComponentsRegister).registeredChange),
                       withLayoutDefaultsOverride(DemoLayoutDefaultsOverrideService),
                       withLayoutMetadataStorage(MetadataStorageLayoutComplex),
                       withCustomRelations(),
                       withBasicComponents(),
                       withCssComponents(),
                       withFormComponents(),
                       withGridComponents(),
                       withHandlebarsComponents(),
                       withMaterialComponents(),
                       withMathComponents(),
                       withRestComponents(),
                       withTinyMceComponents(),),
        <ExistingProvider>
        {
            provide: CustomDynamicItemsRegister,
            useExisting: CustomComponentsRegister,
        },
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
        this.metadata = DemoData.demoRelationsComplexLayout;
    }

    protected loadRestDemo(): void
    {
        this.metadata = DemoData.complexDemoRestLayout;
    }

    protected loadFullDemo(): void
    {
        this.metadata = DemoData.complexDemoFullLayout;
    }
}
