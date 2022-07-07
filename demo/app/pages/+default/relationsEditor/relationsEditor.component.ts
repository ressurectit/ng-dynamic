import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'relations-editor-view',
    templateUrl: 'relationsEditor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations-editor'})
export class RelationsEditorComponent
{}
