import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {HandlebarsLanguageModel, CodeEditorDialogData, CodeEditorDialogComponent, CodeEditorContent} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {DataTemplateRelationsOptions} from '../dataTemplate.options';

/**
 * Relations node component for data template
 */
@Component(
{
    selector: 'data-template-node',
    templateUrl: 'dataTemplateNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTemplateNodeSAComponent extends RelationsNodeBase<DataTemplateRelationsOptions> implements RelationsNode<DataTemplateRelationsOptions>
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
        const result = await lastValueFrom(this.dialog.open<CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent|null>(CodeEditorDialogComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data:
            {
                content: this.metadata?.relationsOptions?.template ?? '',
                languageModel: HandlebarsLanguageModel,

            }
        }).afterClosed());

        if(isPresent(result))
        {
            if(this.metadata?.relationsOptions)
            {
                this.metadata.relationsOptions.template = result.content;
                this.history.getNewState();
            }
        }
    }
}