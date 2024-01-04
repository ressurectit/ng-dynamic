import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {GoBackSADirective} from '@anglr/common';
import {RelationsNodeMetadata, RELATIONS_HISTORY_MANAGER, RelationsEditorSAComponent} from '@anglr/dynamic/relations-editor';
import {LayoutManager} from '@anglr/dynamic/layout-relations';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {LoadSaveNewSAComponent} from '../../../components';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    standalone: true,
    imports:
    [
        GoBackSADirective,
        RelationsEditorSAComponent,
        LoadSaveNewSAComponent,
    ],
    providers:
    [
        // provideLayoutRelationsEditor(),
        // provideBasicLayoutRelationsEditor(),
        // provideMaterialLayoutRelationsEditor(),
        // provideHandlebarsLayoutRelationsEditor(),
        // provideRestLayoutRelationsEditor(),
        // provideTinyMceLayoutRelationsEditor(),
        // provideCssLayoutRelationsEditor(),
        // <ClassProvider>
        // {
        //     provide: PackageManager,
        //     useClass: DemoRelationsPackageManager,
        // },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(protected store: StoreDataService<LayoutRelationsMetadata>,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager,
                protected layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected getMetadata(metadata: RelationsNodeMetadata[]): LayoutRelationsMetadata
    {
        return {
            relations: metadata
        };
    }

    protected loadDemo(): void
    {
        this.metadata = DemoData.relationsWithLayoutDemo;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata): void
    {
        this.metadata = metadata?.relations ?? this.emptyMetadata;
        this.layoutManager.setLayout(metadata?.layout);
    }
}
