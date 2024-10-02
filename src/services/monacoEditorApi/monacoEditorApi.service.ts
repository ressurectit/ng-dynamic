import {inject, Injectable} from '@angular/core';
import type {Emitter, MarkerTag, MarkerSeverity, CancellationTokenSource, Uri, KeyCode, KeyMod, Position, Range, Selection, SelectionDirection, Token, editor, languages} from 'monaco-editor';

import {AmdMonacoEditorLoader} from '../amdMonacoEditorLoader/amdMonacoEditorLoader.service';
import {MonacoEditorType} from '../amdMonacoEditorLoader/amdMonacoEditorLoader.interface';

/**
 * Class that makes monaco editor api accessible
 */
@Injectable({providedIn: 'root'})
export class MonacoEditorApi
{
    //######################### protected fields #########################

    /**
     * Instance of monaco loader for obtaining monaco implementation
     */
    protected monacoEditorLoader: AmdMonacoEditorLoader = inject(AmdMonacoEditorLoader);

    /**
     * Instance of monaco editor
     */
    protected monaco: MonacoEditorType|undefined|null;

    //######################### public properties #########################

    /**
     * Gets type that represents a helper that allows to emit and listen to typed events
     */
    public get Emitter(): Promise<typeof Emitter<unknown>>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Emitter;
        })();
    }

    /**
     * Gets type that represents 'MarkerTag'
     */
    public get MarkerTag(): Promise<typeof MarkerTag>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).MarkerTag;
        })();
    }

    /**
     * Gets type that represents 'MarkerSeverity'
     */
    public get MarkerSeverity(): Promise<typeof MarkerSeverity>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).MarkerSeverity;
        })();
    }

    /**
     * Gets type that represents 'CancellationTokenSource'
     */
    public get CancellationTokenSource(): Promise<typeof CancellationTokenSource>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).CancellationTokenSource;
        })();
    }

    /**
     * Gets type that represents Uniform Resource Identifier (Uri)
     */
    public get Uri(): Promise<typeof Uri>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Uri;
        })();
    }

    /**
     * Gets type that represents Virtual Key Codes, the value does not hold any inherent meaning.
     */
    public get KeyCode(): Promise<typeof KeyCode>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).KeyCode;
        })();
    }

    /**
     * Gets type that represents 'KeyMod'
     */
    public get KeyMod(): Promise<typeof KeyMod>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).KeyMod;
        })();
    }

    /**
     * Gets type that represents a position in the editor.
     */
    public get Position(): Promise<typeof Position>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Position;
        })();
    }

    /**
     * Gets type that represents a range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
     */
    public get Range(): Promise<typeof Range>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Range;
        })();
    }

    /**
     * Gets type that represents a selection in the editor.
     */
    public get Selection(): Promise<typeof Selection>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Selection;
        })();
    }

    /**
     * Gets type that represents the direction of a selection.
     */
    public get SelectionDirection(): Promise<typeof SelectionDirection>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).SelectionDirection;
        })();
    }

    /**
     * Gets type that represents 'Token'
     */
    public get Token(): Promise<typeof Token>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).Token;
        })();
    }

    /**
     * Gets type that represents 'editor'
     */
    public get editor(): Promise<typeof editor>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).editor;
        })();
    }

    /**
     * Gets type that represents 'languages'
     */
    public get languages(): Promise<typeof languages>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).languages;
        })();
    }

    /**
     * Gets type that represents 'languages.typescript'
     */
    public get languagesTypescript(): Promise<typeof languages.typescript>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).languages.typescript;
        })();
    }

    /**
     * Gets type that represents 'languages.css'
     */
    public get languagesCss(): Promise<typeof languages.css>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).languages.css;
        })();
    }

    /**
     * Gets type that represents 'languages.html'
     */
    public get languagesHtml(): Promise<typeof languages.html>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).languages.html;
        })();
    }

    /**
     * Gets type that represents 'languages.json'
     */
    public get languagesJson(): Promise<typeof languages.json>
    {
        return (async () =>
        {
            return (this.monaco ??= (await this.monacoEditorLoader.loadMonacoEditor())).languages.json;
        })();
    }
}