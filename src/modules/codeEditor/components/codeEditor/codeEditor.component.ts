import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy, AfterViewInit, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {isBlank, isPresent, nameof} from '@jscrpt/common';
import {editor, IDisposable, KeyCode, KeyMod, Uri} from 'monaco-editor';

import {LanguageModel} from '../../misc/types';
import {CodeEditorContent} from './codeEditor.interface';
import {monacoInit} from './monaco.init';

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
    //######################### public static properties #########################

    /**
     * Indication whether was monaco init called
     */
    public static monacoInit: boolean = monacoInit;

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
    constructor(protected element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<CodeEditorComponent>('languageModel') in changes && this.languageModel &&
           nameof<CodeEditorComponent>('content') in changes && isPresent(this.content))
        {
            this.updateContent();
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
                code: await this.languageModel.compiledCode(this.codeEditor)
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
    protected createEditor(): void
    {
        this.codeEditor = editor.create(this.element.nativeElement,
        {
            theme: 'vs-dark',
            model: this.openedFile,
            lightbulb:
            {
                enabled: true
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

        this.codeEditor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () =>
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
                    code: await this.languageModel.compiledCode(this.codeEditor)
                });
            }
        });
    }

    /**
     * Updates content of code editor
     */
    protected updateContent(): void
    {
        this.openedFile?.dispose();
        this.openedFile = null;

        if(!this.languageModel || isBlank(this.content))
        {
            return;
        }

        this.openedFile = editor.createModel((this.content || this.languageModel.initialData) ?? '', this.languageModel.language, Uri.file(`file:///index.${this.languageModel.extension}`));
        this.codeEditor?.setModel(this.openedFile);
    }
}