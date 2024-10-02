import {globalDefine, isBlank} from '@jscrpt/common';

import monaco from '../../../../monaco-typings';

declare let ngDynamicMonacoPath: string;

globalDefine(global =>
{
    if(isBlank(global.ngDynamicMonacoPath))
    {
        global.ngDynamicMonacoPath = 'monaco-editor/vs';
    }
});

//TODO: sideeffect

// (self as any).MonacoEnvironment = 
// {
//     getWorkerUrl: function(_: string, label: string)
//     {
//         if (label === 'json')
//         {
//             return `${ngDynamicMonacoPath}/language/json/jsonWorker.js`;
//         }
        
//         if (label === 'css' || label === 'scss' || label === 'less')
//         {
//             return `${ngDynamicMonacoPath}/language/css/cssWorker.js`;
//         }

//         if (label === 'html' || label == 'handlebars')
//         {
//             return `${ngDynamicMonacoPath}/language/html/htmlWorker.js`;
//         }

//         if (label === 'typescript' || label === 'javascript')
//         {
//             return `${ngDynamicMonacoPath}/language/typescript/tsWorker.js`;
//         }

//         return `${ngDynamicMonacoPath}/base/worker/workerMain.js`;
//     }
// };

const options: monaco.languages.typescript.CompilerOptions =
{
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
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
    newLine: monaco.languages.typescript.NewLineKind.LineFeed,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    typeRoots: ['node_modules/@types']
};

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
{
    noSemanticValidation: false,
    noSyntaxValidation: false,
});

monaco.languages.typescript.typescriptDefaults.setCompilerOptions(options);

/**
 * Indication that monaco init code was called
 */
export const monacoInit: boolean = true;