import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, TypescriptLanguageModel} from '@anglr/dynamic';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import typings from '!!raw-loader?esModule!../transformData.interface';
import {languages} from 'monaco-editor';
import {lastValueFrom} from 'rxjs';

import {TransformDataRelationsEditorOptions, TransformDataRelationsOptions} from '../transformData.options';

languages.typescript.typescriptDefaults.addExtraLib(typings, 'file:///node_modules/@types/transformData/index.d.ts');

/**
 * Relations node component for transform data
 */
@Component(
{
    selector: 'transform-data-node',
    templateUrl: 'transformDataNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformDataNodeSAComponent extends RelationsNodeBase<TransformDataRelationsOptions, TransformDataRelationsEditorOptions> implements RelationsNode<TransformDataRelationsOptions, TransformDataRelationsEditorOptions>
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
                content: this.metadata?.nodeMetadata?.options?.content ?? '',
                languageModel: TypescriptLanguageModel(
`import {TransformData} from 'transformData';

/**
 * Class that represents data transformation code
 */
export default class Transformer implements TransformData
{
    /**
     * @inheritdoc
     */
    public transformData(data: any)
    {
        return data;
    }
}
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
    }
}