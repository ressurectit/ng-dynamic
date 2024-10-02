import type {languages} from 'monaco-editor';

import {LanguageModel} from './languageModel';

/**
 * Typescript language model for code editor
 * @param initialValue - Initial value to be used as initial code
 */
export const TypescriptLanguageModel = (initialValue: string): LanguageModel => new LanguageModel('typescript',
                                                                                                  'ts',
                                                                                                  async (editor, monaco) =>
                                                                                                  {
                                                                                                      const uri = editor.getModel()?.uri;
                                                                                                  
                                                                                                      if(!uri)
                                                                                                      {
                                                                                                          return '';
                                                                                                      }
                                                                                                  
                                                                                                      const worker = await (await monaco.languagesTypescript).getTypeScriptWorker();
                                                                                                      const client = await worker(uri);
                                                                                                      const result = await client.getEmitOutput(uri.toString());
                                                                                                  
                                                                                                      return result.outputFiles[0]?.text;
                                                                                                  },
                                                                                                  initialValue,
                                                                                                async monaco =>
                                                                                                {
                                                                                                    const options: languages.typescript.CompilerOptions =
                                                                                                    {
                                                                                                        target: (await monaco.languagesTypescript).ScriptTarget.ES2020,
                                                                                                        module: (await monaco.languagesTypescript).ModuleKind.CommonJS,
                                                                                                        allowNonTsExtensions: true,
                                                                                                        removeComments: true,
                                                                                                        noEmitOnError: true,
                                                                                                        noImplicitAny: true,
                                                                                                        noImplicitReturns: true,
                                                                                                        noImplicitOverride: true,
                                                                                                        noImplicitThis: true,
                                                                                                        noUnusedLocals: true,
                                                                                                        noUnusedParameters: true,
                                                                                                        strict: true,
                                                                                                        strictNullChecks: true,
                                                                                                        resolveJsonModule: true,
                                                                                                        esModuleInterop: true,
                                                                                                        importHelpers: true,
                                                                                                        useDefineForClassFields: false,
                                                                                                        skipLibCheck: false,
                                                                                                        forceConsistentCasingInFileNames: true,
                                                                                                        newLine: (await monaco.languagesTypescript).NewLineKind.LineFeed,
                                                                                                        moduleResolution: (await monaco.languagesTypescript).ModuleResolutionKind.NodeJs,
                                                                                                        typeRoots: ['node_modules/@types']
                                                                                                    };

                                                                                                    (await monaco.languagesTypescript).typescriptDefaults.setDiagnosticsOptions(
                                                                                                    {
                                                                                                        noSemanticValidation: false,
                                                                                                        noSyntaxValidation: false,
                                                                                                    });

                                                                                                    (await monaco.languagesTypescript).typescriptDefaults.setCompilerOptions(options);
                                                                                                });
