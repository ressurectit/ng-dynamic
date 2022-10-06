import {Component, ChangeDetectionStrategy, ClassProvider, FactoryProvider} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {provideRelationsEditorWithStatic, RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';
import {RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {provideBasicRelationsEditor} from '@anglr/dynamic/basic-components';
import {EditorHotkeys, MetadataStorage, PackageManager} from '@anglr/dynamic';

import {DemoData} from '../../../services/demoData';
import {StaticComponentsRegister} from '../../../services/staticComponentsRegister/staticComponentsRegister.service';
import {DemoRelationsPackageManager} from '../../../services/demoRelationsPackageManager/demoRelationsPackageManager.service';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'editor-view',
    templateUrl: 'editor.component.html',
    providers:
    [
        EditorHotkeys,
        <FactoryProvider>
        {
            provide: RELATIONS_METADATA_STORAGE,
            useFactory: () => new MetadataStorage<RelationsNodeMetadata[]>(() => []),
        },
        provideRelationsEditorWithStatic(StaticComponentsRegister),
        provideTinyMceRelationsEditor(),
        provideBasicRelationsEditor(),
        provideHandlebarsRelationsEditor(),
        <ClassProvider>
        {
            provide: PackageManager,
            useClass: DemoRelationsPackageManager,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'editor'})
export class EditorComponent
{
    //######################### protected properties - template bindings #########################

    protected metadata: RelationsNodeMetadata[] = DemoData.relationsStaticWithEditorDemo;

    //######################### constructor #########################
    constructor(private _manager: RelationsNodeManager,)
    {
    }

    //######################### protected methods - template bindings #########################

    protected save(): void
    {
        DemoData.relationsStaticWithEditorDemo = this._manager.getMetadata();
    }
}
