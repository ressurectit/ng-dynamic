import {LanguageModel} from '../../misc/types';

/**
 * Data for code editor dialog
 */
export interface CodeEditorDialogData
{
    /**
     * Content to be displayed
     */
    content: string;

    /**
     * Language model to be used
     */
    languageModel: LanguageModel;
}