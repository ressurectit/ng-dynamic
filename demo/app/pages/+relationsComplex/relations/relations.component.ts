import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {LayoutManager, provideLayoutRelationsEditorWithStatic} from '@anglr/dynamic/layout-relations';
import {CSS_LAYOUT_COMPONENTS_PROVIDER, CSS_LAYOUT_MODULE_TYPES_PROVIDER} from '@anglr/dynamic/css-components';
import {TINY_MCE_LAYOUT_COMPONENTS_PROVIDER, TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER} from '@anglr/dynamic/tinymce-components';
import {HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER, HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER} from '@anglr/dynamic/handlebars-components';
import {BindThis} from '@jscrpt/common';

import {DemoData} from '../../../services/demoData';
import {StoreDataService} from '../../../services/storeData';
import {LayoutRelationsMetadata} from '../../../misc/interfaces';
import {ComplexStaticRegister} from '../misc';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relations.component.html',
    providers:
    [
        // DemoStorage,
        // <ExistingProvider>
        // {
        //     provide: MetadataStorage,
        //     useExisting: DemoStorage
        // },
        provideLayoutRelationsEditorWithStatic(ComplexStaticRegister),
        CSS_LAYOUT_COMPONENTS_PROVIDER,
        CSS_LAYOUT_MODULE_TYPES_PROVIDER,
        TINY_MCE_LAYOUT_COMPONENTS_PROVIDER,
        TINY_MCE_LAYOUT_MODULE_TYPES_PROVIDER,
        HANDLEBARS_LAYOUT_COMPONENTS_PROVIDER,
        HANDLEBARS_LAYOUT_MODULE_TYPES_PROVIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
@ComponentRoute({path: 'relations/:id'})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    protected _metadata: RelationsNodeMetadata[] = [];

    protected get emptyMetadata(): RelationsNodeMetadata[]
    {
        return [];
    }

    //######################### constructor #########################
    constructor(private _manager: RelationsNodeManager,
                protected _store: StoreDataService<LayoutRelationsMetadata>,
                protected _layoutManager: LayoutManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    @BindThis
    protected _getMetadata(): LayoutRelationsMetadata
    {
        return {
            relations: this._manager.getMetadata()
        };
    }

    protected _loadDemo(): void
    {
        this._metadata = DemoData.demoRelationsComplexRelations;
    }

    protected setMetadata(metadata: LayoutRelationsMetadata): void
    {
        this._metadata = metadata?.relations ?? this.emptyMetadata;
        this._layoutManager.setLayout(metadata?.layout);
    }
}
