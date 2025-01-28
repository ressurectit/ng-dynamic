import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {isPresent} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {RichTextSourceRelationsOptions} from '../richTextSource.options';
import {RichTextBlockEditorDialogComponent} from '../../richTextBlock/misc/components';

/**
 * Relations node component for rich text source
 */
@Component(
{
    selector: 'rich-text-source-node',
    templateUrl: 'richTextSourceNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextSourceNodeComponent extends RelationsNodeBase<RichTextSourceRelationsOptions> implements RelationsNode<RichTextSourceRelationsOptions>
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
        const result = await lastValueFrom(this.dialog.open<RichTextBlockEditorDialogComponent, string, string|null>(RichTextBlockEditorDialogComponent,
        {
            title: 'Rich text editor',
            width: '75vw',
            height: '75vh',
            data: this.metadata?.relationsOptions?.content ?? '',
        }).afterClosed());

        if(isPresent(result))
        {
            if(this.metadata?.relationsOptions)
            {
                this.metadata.relationsOptions.content = result;
                this.history.getNewState();
            }
        }
    }
}
