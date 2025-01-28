import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, MonacoEditorApi, TypescriptLanguageModel} from '@anglr/dynamic';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import typings from '@anglr/dynamic/typings/transformData/monaco-type';
import {generateId} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import type {IDisposable} from 'monaco-editor';

import {TransformDataRelationsEditorOptions, TransformDataRelationsOptions} from '../transformData.options';

/**
 * Relations node component for transform data
 */
@Component(
{
    selector: 'transform-data-node',
    templateUrl: 'transformDataNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        FirstUppercaseLocalizePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformDataNodeSAComponent extends RelationsNodeBase<TransformDataRelationsOptions, TransformDataRelationsEditorOptions> implements RelationsNode<TransformDataRelationsOptions, TransformDataRelationsEditorOptions>
{
    //######################### protected fields #########################

    /**
     * Disposable for added typings
     */
    protected typingsDisposable: IDisposable|undefined|null;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                monacoEditorApi: MonacoEditorApi,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, element);

        (async() =>
        {
            this.typingsDisposable = (await monacoEditorApi.languagesTypescript).typescriptDefaults.addExtraLib(typings, 'file:///node_modules/@types/transformData/index.d.ts');
        })();
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public override ngOnDestroy(): void
    {
        super.ngOnDestroy();

        this.typingsDisposable?.dispose();
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
                content: this.metadata?.nodeMetadata?.options?.content ?? '',
                languageModel: TypescriptLanguageModel(
`import {TransformData} from 'transformData';

/**
 * Transformer function that performs transformation
 */
const transformer: TransformData<any, any> = data =>
{
    return data;
};
 
export default transformer;
`),
            }
        }).afterClosed());

        if(!this.metadata?.relationsOptions || !result || !this.metadata.nodeMetadata)
        {
            return;
        }

        this.metadata.relationsOptions.code = result.code;
        this.metadata.nodeMetadata.options ??= {content: ''};
        this.metadata.nodeMetadata.options.content = result.content;
        this.history.getNewState();
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override metadataSet(): void
    {
        if(this.metadata?.relationsOptions)
        {
            this.metadata.relationsOptions.id ??= generateId(12);
        }
    }
}