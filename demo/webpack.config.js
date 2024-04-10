import webpack from 'webpack';
import path from 'path';
import {createHash} from 'crypto';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CompressionPlugin from 'compression-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import BitBarWebpackProgressPlugin from 'bitbar-webpack-progress-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import {AngularWebpackPlugin} from '@ngtools/webpack';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import asyncGeneratorFunctions from '@babel/plugin-transform-async-generator-functions';
import asyncToGenerator from '@babel/plugin-transform-async-to-generator';
import {HmrLoader} from '@angular-devkit/build-angular/src/tools/webpack/plugins/hmr/hmr-loader.js';
import {JavaScriptOptimizerPlugin} from '@angular-devkit/build-angular/src/tools/webpack/plugins/javascript-optimizer-plugin.js';
import {dirName, numeralResolve, cryptoBrowserifyResolve, bufferResolve, streamBrowserifyResolve, ngVersion, tsConfig, webpackConfig} from './webpack.commonjs.cjs';

/**
 * Gets entries for webpack
 * @param {boolean} css Indication that it should be css added to entries
 */
function getEntries(css)
{
    const entries =
    {
        ...css ? 
        {
            style: [path.join(dirName, 'content/site.scss'),
                    path.join(dirName, 'content/dark.scss'),
                    path.join(dirName, 'content/light.scss')]
        } : {},
        client: [path.join(dirName, 'app/main.browser.ts')]
    };

    return entries;
}

/**
 * Gets array of webpack loaders for external style files
 */
function getCssLoaders()
{
    return [{loader: MiniCssExtractPlugin.loader, options: {publicPath: ''}}, 'css-loader'];
}

/**
 * Gets array of webpack loaders for style files
 */
function getSassLoaders()
{
    return [{loader: MiniCssExtractPlugin.loader, options: {publicPath: ''}}, 'css-loader', 'sass-loader'];
}

const distPath = 'wwwroot/dist';
const angularEntryFile = 'main.browser.bootstrap.ts';

export default [function(options, args)
{
    var prod = args && args.mode == 'production' || false;
    var hmr = !!options && !!options.hmr;
    var debug = !!options && !!options.debug;
    var css = !!options && !!options.css;
    var html = !!options && !!options.html;
    var nomangle = !!options && !!options.nomangle;
    var noCache = !!options && !!options.noCache;
    var esbuild = !!options && !!options.esbuild;

    options = options || {};

    console.log(`Running build with following configuration Production: ${prod} HMR: ${hmr} Debug: ${debug} CSS: ${css} HTML: ${html} NoMangle: ${nomangle} NoCache: ${noCache} EsBuild: ${esbuild}`);

    const config =
    {
        entry: getEntries(css),
        output:
        {
            globalObject: 'self',
            path: path.join(dirName, distPath),
            filename: `[name].js`,
            publicPath: prod ? 'dist/' : '/dist/',
            chunkFilename: `[name].chunk.js`,
            assetModuleFilename: 'assets/[hash][ext][query]'
        },
        mode: 'development',
        ...hmr ?
            {
                devServer:
                {
                    hot: true,
                    port: 9000,
                    static:
                    {
                        directory: path.join(dirName, distPath, 'assets'),
                        publicPath: '/dist/assets',
                        watch: true
                    },
                    devMiddleware:
                    {
                        publicPath: '/dist/',
                        writeToDisk: true,
                    },
                    client:
                    {
                        logging: 'info',
                        overlay: 
                        {
                            errors: true,
                            warnings: false
                        },
                        progress: true,
                    },
                },
                devtool: 'eval-source-map'
            } :
            {
                devtool: 'source-map'
            },
        target: 'web',
        //TODO remove this when https://github.com/webpack/webpack-dev-server/issues/2792 is fixed
        optimization:
        {
            runtimeChunk: 'single',
            ...prod ? 
                {
                    splitChunks: 
                    {
                        chunks: 'all',
                    }
                } : {},
        },
        ...noCache ? {} :
        {
            cache:
            {
                type: 'filesystem',
                cacheDirectory: path.join(dirName, "node_modules", ".cache", 'angular-webpack'),
                maxMemoryGenerations: 1,
                name: createHash('sha1')
                    .update(ngVersion)
                    .update(dirName)
                    .update(tsConfig)
                    .update(webpackConfig)
                    .digest('hex'),
            }
        },
        resolve:
        {
            symlinks: false,
            fallback:
            {
                "crypto": cryptoBrowserifyResolve,
                "buffer": bufferResolve,
                "stream": streamBrowserifyResolve
            },
            extensions: ['.ts', '.mjs', '.js'],
            alias:
            {
                "modernizr": path.join(dirName, "content/external/scripts/modernizr-custom.js"),
                "numeral-languages": path.join(dirName, "../node_modules/numeral/locales.js"),
                "handlebars": path.join(dirName, "../node_modules/handlebars/dist/handlebars.js"),
                "@anglr/dynamic/styles/themes/dark": path.join(dirName, "../styles/themes/dark.scss"),
                "@anglr/dynamic/styles/themes/light": path.join(dirName, "../styles/themes/light.scss"),
                "@anglr/dynamic/styles": path.join(dirName, "../styles/index.scss"),
                "@anglr/dynamic/layout": path.join(dirName, "../layout/src"),
                "@anglr/dynamic/layout-editor": path.join(dirName, "../layout-editor/src"),
                "@anglr/dynamic/layout-relations": path.join(dirName, "../layout-relations/src"),
                "@anglr/dynamic/form": path.join(dirName, "../form/src"),
                "@anglr/dynamic/relations": path.join(dirName, "../relations/src"),
                "@anglr/dynamic/relations-editor": path.join(dirName, "../relations-editor/src"),
                "@anglr/dynamic/relations-debugger": path.join(dirName, "../relations-debugger/src"),
                "@anglr/dynamic/basic-components": path.join(dirName, "../basic-components/src"),
                "@anglr/dynamic/material-components": path.join(dirName, "../material-components/src"),
                "@anglr/dynamic/css-components": path.join(dirName, "../css-components/src"),
                "@anglr/dynamic/handlebars-components": path.join(dirName, "../handlebars-components/src"),
                "@anglr/dynamic/rest-components": path.join(dirName, "../rest-components/src"),
                "@anglr/dynamic/tinymce-components": path.join(dirName, "../tinymce-components/src"),
                "@anglr/dynamic/math-components": path.join(dirName, "../math-components/src"),
                "@anglr/dynamic/grid-components": path.join(dirName, "../grid-components/src"),
                "@anglr/dynamic/typings/transformData": path.join(dirName, "../basic-components/src/dynamicItems/transformData/transformData.interface.ts"),
                "@anglr/dynamic/typings/state": path.join(dirName, "../basic-components/src/dynamicItems/state/state.interface.ts"),
                "@anglr/dynamic": path.join(dirName, "../src/index.ts"),
                "app": path.join(dirName, "app")
            },
            mainFields: ['esm2022', 'es2022', 'esm2020', 'esm2015', 'es2015', 'jsnext:main', 'browser', 'module', 'main'],
            conditionNames: ['esm2022', 'es2022', 'esm2020', 'es2015', 'import']
        },
        module:
        {
            rules:
            [
                ...hmr ? 
                [
                    {
                        loader: HmrLoader,
                        include: path.join(dirName, 'app', angularEntryFile),
                    }
                ] : [],
                {
                    test: numeralResolve,
                    use:
                    [
                        {
                            loader: 'expose-loader',
                            options:
                            {
                                exposes: 'numeral'
                            }
                        }
                    ]
                },
                //file processing
                {
                    test: /\.ts$/,
                    use:
                    [
                        {
                            loader: 'babel-loader',
                            options: 
                            {
                                plugins:
                                [
                                    asyncGeneratorFunctions,
                                    asyncToGenerator,
                                ],
                                compact: false,
                                cacheDirectory: true,
                            }
                        },
                        '@ngtools/webpack',
                    ]
                },
                {
                    test: /\.m?js$/,
                    use: 
                    {
                        loader: 'babel-loader',
                        options: 
                        {
                            plugins:
                            [
                                linkerPlugin,
                                asyncGeneratorFunctions,
                                asyncToGenerator,
                            ],
                            compact: false,
                            cacheDirectory: true,
                        }
                    },
                    resolve: 
                    {
                        fullySpecified: false
                    },
                },
                {
                    test: /\.html$/,
                    use: ['raw-loader']
                },
                {
                    test: /\.typings$/,
                    use: ['raw-loader']
                },
                {
                    test: /\.component\.scss$/,
                    use: ['raw-loader', 'sass-loader'],
                    include:
                    [
                        path.join(dirName, 'app')
                    ]
                },
                {
                    test: /\.component\.css$/,
                    use: ['raw-loader'],
                    include:
                    [
                        path.join(dirName, 'packages'),
                    ]
                },
                {
                    test: /\.css$/,
                    use: getCssLoaders(),
                    exclude:
                    [
                        path.join(dirName, 'app'),
                        path.join(dirName, 'packages'),
                    ]
                },
                {
                    test: /\.scss$/,
                    use: getSassLoaders(),
                    exclude:
                    [
                        path.join(dirName, 'app')
                    ]
                },
                {
                    test: /\.(ttf|woff|woff2|eot|svg|png|jpeg|jpg|bmp|gif|icon|ico)$/,
                    type: 'asset/resource'
                },
            ]
        },
        plugins:
        [
            new WebpackNotifierPlugin({title: `Webpack - ${hmr ? 'HMR' : 'BUILD'}`, excludeWarnings: true, alwaysNotify: true, sound: false}),
            //copy external dependencies
            new CopyWebpackPlugin(
            {
                patterns:
                [
                    {
                        context: "content/api",
                        from: "**/*.*",
                        to: "../api"
                    },
                    {
                        context: "../node_modules/tinymce",
                        from: "**/*.*",
                        to: "../tinymce"
                    },
                ],
                options: 
                {
                    concurrency: 10,
                },
            }),
            new BitBarWebpackProgressPlugin(),
            new webpack.DefinePlugin(
            {
                isProduction: prod,
                jsDevMode: !prod,
                ...prod ? {ngDevMode: false} : {},
                ngI18nClosureMode: false,
                ngDesignerMetadata: true,
                ngRelationsDebugger: false,
                ngDynamicMonacoPath: JSON.stringify('dist'),
                ngDynamicTinymcePath: JSON.stringify('tinymce'),
            }),
            new MiniCssExtractPlugin(
            {
                filename: prod ? '[name].[hash].css' : '[name].css',
                chunkFilename: prod ? '[id].[hash].css' : '[id].css'
            }),
            new AngularWebpackPlugin(
            {
                tsConfigPath: path.join(dirName, 'tsconfig.json'),
                sourceMap: true,
            }),
        ],
    };

    if(prod && esbuild)
    {
        config.optimization =
        {
            minimizer: 
            [
                new JavaScriptOptimizerPlugin(
                {
                    // define: buildOptions.aot ? GLOBAL_DEFS_FOR_TERSER_WITH_AOT : GLOBAL_DEFS_FOR_TERSER,
                    sourcemap: true,
                    // target: ScriptTarget.ES2020,
                    target: 7,
                    keepNames: nomangle,
                    removeLicenses: false,
                    // advanced: buildOptions.buildOptimizer,
                })
            ]
        };
    }

    if(prod && nomangle && !esbuild)
    {
        config.optimization =
        {
            minimize: true,
            minimizer:
            [
                new TerserPlugin(
                {
                    terserOptions:
                    {
                        mangle: false
                    }
                })
            ]
        };
    }

    if(html)
    {
        config.plugins.push(new HtmlWebpackPlugin(
        {
            filename: '../index.html',
            template: path.join(dirName, 'index.html'),
            inject: 'head'
        }));

        if(!debug)
        {
            config.plugins.push(new ScriptExtHtmlWebpackPlugin(
            {
                defaultAttribute: 'defer'
            }));
        }
    }

    //production specific settings - prod is used only for client part
    if(prod)
    {
        config.output.filename = `[name].[hash].js`;
        config.output.chunkFilename = `[name].chunk.[chunkhash].js`;

        config.plugins.push(new CompressionPlugin({test: /\.js$|\.css$/}));
    }

    //this is used for debugging speed of compilation
    if(debug)
    {
        config.plugins.push(new BundleAnalyzerPlugin());

        let smp = new SpeedMeasurePlugin({outputFormat: 'humanVerbose'});

        return smp.wrap(config);
    }

    return config;
},
{
    mode: 'development',
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
		path: path.join(dirName, distPath),
        filename: '[name].js'
	},
    plugins:
    [
        new MiniCssExtractPlugin(
        {
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    module: 
    {
        rules: 
        [
            {
                test: /\.css$/,
                use: getCssLoaders()
            }
        ]
	}
}];