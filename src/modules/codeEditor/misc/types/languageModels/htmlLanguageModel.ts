import {LanguageModel} from './languageModel';

/**
 * Html language model for code editor
 */
export const HtmlLanguageModel = new LanguageModel('html', 'html', editor =>
{
    return editor.getModel()?.getValue() ?? '';
});