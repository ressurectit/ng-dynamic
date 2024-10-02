import {LanguageModel} from './languageModel';

/**
 * Typescript language model for code editor
 * @param initialValue - Initial value to be used as initial code
 */
export const TypescriptLanguageModel = (initialValue: string): LanguageModel => new LanguageModel('typescript',
                                                                                                  'ts',
                                                                                                  async editor =>
                                                                                                  {
                                                                                                      const uri = editor.getModel()?.uri;
                                                                                                  
                                                                                                      if(!uri)
                                                                                                      {
                                                                                                          return '';
                                                                                                      }
                                                                                                  
                                                                                                      const worker = await monaco.languages.typescript.getTypeScriptWorker();
                                                                                                      const client = await worker(uri);
                                                                                                      const result = await client.getEmitOutput(uri.toString());
                                                                                                  
                                                                                                      return result.outputFiles[0].text;
                                                                                                  },
                                                                                                  initialValue);
