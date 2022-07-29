import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Inject} from '@angular/core';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER, RELATIONS_NODE_DESTROY_SUBJECT, RelationsNodeDestroySubject} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {isPresent} from '@jscrpt/common';

import {RichTextSourceRelationsOptions} from '../richTextSource.options';
import {RichTextBlockEditorDialogSAComponent} from '../../richTextBlock/misc/components';

/**
 * Relations node component for rich text source
 */
@Component(
{
    selector: 'rich-text-source-node',
    templateUrl: 'richTextSourceNode.component.html',
    // styleUrls: ['richTextSourceNode.component.css'],
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeOutputSAComponent,
    ],
    providers:
    [
        RELATIONS_NODE_DESTROY_SUBJECT_PROVIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextSourceNodeSAComponent extends RelationsNodeBase<RichTextSourceRelationsOptions> implements RelationsNode<RichTextSourceRelationsOptions>
{
    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,
                @Inject(RELATIONS_NODE_DESTROY_SUBJECT) destroySubject?: RelationsNodeDestroySubject,)
    {
        super(changeDetector, element,destroySubject);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Shows code editor
     */
    protected async showCodeEditor(): Promise<void>
    {
        const result = await this.dialog.open<RichTextBlockEditorDialogSAComponent, string, string|null>(RichTextBlockEditorDialogSAComponent,
        {
            title: 'Rich text editor',
            width: '75vw',
            height: '75vh',
            data: this.metadata?.relationsOptions?.content ?? ''
        }).afterClosed()
            .toPromise();

        if(isPresent(result))
        {
            if(this.metadata?.relationsOptions)
            {
                this.metadata.relationsOptions.content = result;
            }
        }
    }
}