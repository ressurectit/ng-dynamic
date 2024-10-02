import path from 'path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const dirName = dirname(fileURLToPath(import.meta.url));

export default
[
    {
        mode: 'production',
        entry:
        {
            "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
            "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
            "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
            "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
            "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker'
        },
        output:
        {
            globalObject: 'self',
            path: path.join(dirName, 'wwwroot', 'browser', 'worker'),
            filename: '[name].js',
            assetModuleFilename: 'assets/[hash][ext][query]'
        },
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(ttf|woff|woff2|eot|svg|png|jpeg|jpg|bmp|gif|icon|ico)$/,
                    type: 'asset/resource'
                }
            ]
        }
    },
    {
        mode: 'production',
        entry:
        {
            "editor.main": 'monaco-editor/esm/vs/editor/editor.main.js',
        },
        output:
        {
            path: path.join(dirName, 'wwwroot', 'browser', 'worker'),
            filename: '[name].js',
            assetModuleFilename: 'assets/[hash][ext][query]',
            library: 
            {
                name: 'monaco',
                type: 'var',
            },
        },
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(ttf|woff|woff2|eot|svg|png|jpeg|jpg|bmp|gif|icon|ico)$/,
                    type: 'asset/resource'
                }
            ]
        }
    }
];