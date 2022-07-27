import {Func} from '@jscrpt/common';
import {editor} from 'monaco-editor';

/**
 * Class that represents language model for code editor
 */
export class LanguageModel
{
    //######################### constructor #########################
    constructor(public language: string,
                public extension: string,
                public compiledCode: Func<string, [editor.IStandaloneCodeEditor]>,)
    {
    }
}