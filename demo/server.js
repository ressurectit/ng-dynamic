import express from 'express';
import compression from 'compression';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import path from 'path';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import {extendConnectUse} from 'nodejs-connect-extensions';
import dotenv from 'dotenv';

const consoleLog = console.log;
const consoleError = console.error;
const consoleWarn = console.warn;
const logs = [];

console.log = (message, ...optionalParams) =>
{
    logs.push(JSON.stringify(message) + ', ' + optionalParams.map(itm => JSON.stringify(itm)).join(', '));
    consoleLog(message, ...optionalParams);
};

console.error = (message, ...optionalParams) =>
{
    logs.push('ERROR: ' + JSON.stringify(message) + ', ' + optionalParams.map(itm => JSON.stringify(itm)).join(', '));
    consoleError(message, ...optionalParams);
};

console.warn = (message, ...optionalParams) =>
{
    logs.push('WARNING: ' + JSON.stringify(message) + ', ' + optionalParams.map(itm => JSON.stringify(itm)).join(', '));
    consoleWarn(message, ...optionalParams);
};

async function run()
{
    const argv = yargs(hideBin(process.argv)).argv;
    const server = express();

    server.use(compression());

    dotenv.config();

    extendConnectUse(server);

    const dirName = dirname(fileURLToPath(import.meta.url));
    const wwwroot = path.join(dirName, 'wwwroot', 'browser');
    const indexHtml = path.join(wwwroot, 'index.html')
    let port = process.env['PORT'] || 8888;

    //start with dev port
    if(!!argv.devPort)
    {
        port = 8880;
    }

    server.get('/consoleLog', (_, res) => res.send(logs));

    server.set('view engine', 'html');
    server.set('views', wwwroot);

    // Serve static files from /browser
    server.get('*.*', express.static(wwwroot,
    {
        maxAge: '1y',
        setHeaders: (res, path) =>
        {
            if (express.static.mime.lookup(path) === 'text/html')
            {
                // Skip cache on html to load new builds.
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Expires', '-1');
                res.setHeader('Pragma', 'no-cache');
            }
        }
    }));

    server.get('/*', (_, res) => res.sendFile(indexHtml));

    //create node.js http server and listen on port
    server.listen(port, () =>
    {
        console.log(`Listening on port ${port} => http://localhost:${port}`);
    });
}

run();