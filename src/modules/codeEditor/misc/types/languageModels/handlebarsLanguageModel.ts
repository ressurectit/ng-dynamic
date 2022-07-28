import {LanguageModel} from './languageModel';

/**
 * Handlebars language model for code editor
 */
export const HandlebarsLanguageModel = new LanguageModel('handlebars', 'hbs', editor =>
{
    return editor.getModel()?.getValue() ?? '';
});