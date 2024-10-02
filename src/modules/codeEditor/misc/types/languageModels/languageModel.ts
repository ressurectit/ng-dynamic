import {Func1, Func2, PromiseOr} from '@jscrpt/common';
import type {editor} from 'monaco-editor';

import type {MonacoEditorApi} from '../../../../../services';

/**
 * Class that represents language model for code editor
 */
export class LanguageModel
{
    //######################### constructor #########################
    constructor(public language: string,
                public extension: string,
                public compiledCode: Func2<PromiseOr<string>, editor.IStandaloneCodeEditor, MonacoEditorApi>,
                public initialData?: string,
                public initLanguage?: Func1<Promise<void>, MonacoEditorApi>,)
    {
    }
}