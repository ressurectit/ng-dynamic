import {Func1, PromiseOr} from '@jscrpt/common';

import monaco from '../../../../../monaco-typings';

/**
 * Class that represents language model for code editor
 */
export class LanguageModel
{
    //######################### constructor #########################
    constructor(public language: string,
                public extension: string,
                public compiledCode: Func1<PromiseOr<string>, monaco.editor.IStandaloneCodeEditor>,
                public initialData?: string,)
    {
    }
}