import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {provideRelationsEditorWithStatic, RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {provideTinyMceRelationsEditor} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelationsEditor} from '@anglr/dynamic/handlebars-components';

import {DemoData} from '../../../services/demoData';
import {StaticComponentsRegister} from '../../../services/staticComponentsRegister/staticComponentsRegister.service';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'editor-view',
    templateUrl: 'editor.component.html',
    providers:
    [
        provideRelationsEditorWithStatic(StaticComponentsRegister),
        // provideTinyMceRelations(),
        provideTinyMceRelationsEditor(),
        // provideHandlebarsRelations(),
        provideHandlebarsRelationsEditor(),
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
