import {languages} from 'monaco-editor';

(self as any).MonacoEnvironment = 
{
    getWorkerUrl: function(_: string, label: string)
    {
        if (label === 'json')
        {
            return 'dist/json.worker.js';
        }
        
        if (label === 'css' || label === 'scss' || label === 'less')
        {
            return 'dist/css.worker.js';
        }

        if (label === 'html' || label == 'handlebars')
        {
            return 'dist/html.worker.js';
        }

        if (label === 'typescript' || label === 'javascript')
        {
            return 'dist/ts.worker.js';
        }

        return 'dist/editor.worker.js';
    }
};

const options: languages.typescript.CompilerOptions =
{
    target: languages.typescript.ScriptTarget.ES2020,
    module: languages.typescript.ModuleKind.CommonJS,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
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
    esModuleInterop: true,
    newLine: languages.typescript.NewLineKind.LineFeed,
    typeRoots: ['node_modules/@types']
};

languages.typescript.typescriptDefaults.setDiagnosticsOptions(
{
    noSemanticValidation: false,
    noSyntaxValidation: false,
});

languages.typescript.typescriptDefaults.setCompilerOptions(options);

/**
 * Indication that monaco init code was called
 */
export const monacoInit: boolean = true;