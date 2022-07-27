import {LanguageModel} from './languageModel';

/**
 * Css language model for code editor
 */
export const CssLanguageModel = new LanguageModel('css', 'css', editor =>
{
    return editor.getModel()?.getValue() ?? '';
});