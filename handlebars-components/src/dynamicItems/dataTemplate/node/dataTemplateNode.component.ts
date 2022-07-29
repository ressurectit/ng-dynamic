import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {CodeEditorDialogData, CodeEditorDialogSAComponent} from '@anglr/dynamic/layout-editor';
import {HandlebarsLanguageModel} from '@anglr/dynamic';
import {isPresent} from '@jscrpt/common';

import {DataTemplateRelationsOptions} from '../dataTemplate.options';

/**
 * Relations node component for data template
 */
@Component(
{
    selector: 'data-template-node',
    templateUrl: 'dataTemplateNode.component.html',
    // styleUrls: ['dataTemplateNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    providers:
    [
        RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER,
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
        const result = await this.dialog.open<CodeEditorDialogSAComponent, CodeEditorDialogData, string|null>(CodeEditorDialogSAComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data: 
            {
                content: this.metadata?.relationsOptions?.template ?? '',
                languageModel: HandlebarsLanguageModel,

            }
        }).afterClosed()
            .toPromise();

        if(isPresent(result))
        {
            if(this.metadata?.relationsOptions)
            {
                this.metadata.relationsOptions.template = result;
            }
        }
    }
}