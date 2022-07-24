import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsNodeManager, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

import {DemoData} from '../../../services/demoData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'editor-view',
    templateUrl: 'editor.component.html',
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
