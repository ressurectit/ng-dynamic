import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy, AfterViewInit, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {isBlank, isPresent, nameof} from '@jscrpt/common';
import type {editor, IDisposable} from 'monaco-editor';

import {LanguageModel} from '../../misc/types';
import {CodeEditorContent} from './codeEditor.interface';
import {MonacoEditorApi} from '../../../../services';

/**
 * Component used for editing code
 */
@Component(
{
    selector: 'code-editor',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements OnDestroy, AfterViewInit, OnChanges
{
    //######################### protected fields #########################

    /**
     * Instance of code editor
     */
    protected codeEditor: editor.IStandaloneCodeEditor|null = null;

    /**
     * Opened file in editor
     */
    protected openedFile: editor.ITextModel|null = null;

    /**
     * Handler for event of change of model
     */
    protected changeEvent: IDisposable|null = null;

    //######################### public properties - inputs #########################

    /**
     * Content that is being displayed
     */
    @Input()
    public content: string|undefined|null;

    /**
     * Language model used for selecting proper language
     */
    @Input()
    public languageModel: LanguageModel|undefined|null;

    //######################### public properties - outputs #########################

    /**
     * Occurs when content of editor is saved
     */
    @Output()
    public save: EventEmitter<CodeEditorContent> = new EventEmitter<CodeEditorContent>();

    /**
     * Occurs when content of editor changes, new value passed down
     */
    @Output()
    public contentChange: EventEmitter<CodeEditorContent> = new EventEmitter<CodeEditorContent>();

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected monacoEditorApi: MonacoEditorApi,
    )
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<CodeEditorComponent>('languageModel') in changes && this.languageModel &&
           nameof<CodeEditorComponent>('content') in changes && isPresent(this.content))
        {
            if(this.languageModel)
            {
                await this.languageModel.initLanguage?.(this.monacoEditorApi);
            }

            await this.updateContent();
        }
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        this.createEditor();
    }

    //######################### public methods #########################

    /**
     * Saves currently opened document
     */
    public async saveContent(): Promise<void>
    {
        if(this.openedFile && this.codeEditor && this.languageModel)
        {
            this.save.emit(
            {
                content: this.openedFile.getValue(),
                code: await this.languageModel.compiledCode(this.codeEditor, this.monacoEditorApi)
            });
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.changeEvent?.dispose();
        this.changeEvent = null;

        this.openedFile?.dispose();
        this.openedFile = null;

        this.codeEditor?.dispose();
        this.codeEditor = null;
    }

    //######################### protected methods #########################

    /**
     * Creates editor
     */
    protected async createEditor(): Promise<void>
    {
        this.codeEditor = (await this.monacoEditorApi.editor).create(this.element.nativeElement,
        {
            theme: 'vs-dark',
            model: this.openedFile,
            lightbulb:
            {
                enabled: (await this.monacoEditorApi.editor).ShowLightbulbIconMode.OnCode,
            },
            bracketPairColorization: 
            {
                enabled: true,
            },
            minimap:
            {
                enabled: true
            },
        });

        this.codeEditor.addCommand((await this.monacoEditorApi.KeyMod).CtrlCmd | (await this.monacoEditorApi.KeyCode).KeyS, () =>
        {
            this.saveContent();
        });

        this.changeEvent = this.codeEditor.onDidChangeModelContent(async () =>
        {
            if(this.openedFile && this.languageModel && this.codeEditor)
            {
                this.contentChange.emit(
                {
                    content: this.openedFile.getValue(),
                    code: await this.languageModel.compiledCode(this.codeEditor, this.monacoEditorApi)
                });
            }
        });
    }

    /**
     * Updates content of code editor
     */
    protected async updateContent(): Promise<void>
    {
        this.openedFile?.dispose();
        this.openedFile = null;

        if(!this.languageModel || isBlank(this.content))
        {
            return;
        }

        this.openedFile = (await this.monacoEditorApi.editor).createModel((this.content || this.languageModel.initialData) ?? '', this.languageModel.language, (await this.monacoEditorApi.Uri).file(`index.${this.languageModel.extension}`));
        this.codeEditor?.setModel(this.openedFile);
    }
}