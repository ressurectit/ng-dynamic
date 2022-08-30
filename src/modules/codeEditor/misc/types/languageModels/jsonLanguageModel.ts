import {LanguageModel} from './languageModel';

/**
 * Json language model for code editor
 */
export const JsonLanguageModel = new LanguageModel('json', 'json', editor =>
{
    return editor.getModel()?.getValue() ?? '';
});