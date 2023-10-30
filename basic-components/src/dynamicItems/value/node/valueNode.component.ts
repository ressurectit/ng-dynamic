import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, getJson, JsonLanguageModel} from '@anglr/dynamic';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {ValueRelationsOptions} from '../value.options';

/**
 * Relations node component for value
 */
@Component(
{
    selector: 'value-node',
    templateUrl: 'valueNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueNodeSAComponent extends RelationsNodeBase<ValueRelationsOptions> implements RelationsNode<ValueRelationsOptions>
{
//######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, element);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        const content = isPresent(this.metadata?.relationsOptions?.value) ? JSON.stringify(this.metadata?.relationsOptions?.value, null, 4) : '';

        const result = await lastValueFrom(this.dialog.open<CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent|null>(CodeEditorDialogComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data: 
            {
                content,
                languageModel: JsonLanguageModel,

            }
        }).afterClosed());

        if(!this.metadata?.relationsOptions)
        {
            return;
        }

        if(isPresent(result))
        {
            this.metadata.relationsOptions.value = getJson(result.content);
            this.history.getNewState();
        }
    }
}