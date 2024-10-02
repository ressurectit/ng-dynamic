import createSymlink from 'create-symlink';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import path from 'path';
import fs from 'fs';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;
const dirName = dirname(fileURLToPath(import.meta.url));

const extension = argv.start ? 'ts' : 'd.ts';

const paths = 
[
    'basic-components/src/dynamicItems/transformData/transformData.interface',
    'basic-components/src/dynamicItems/state/state.interface',
];

for(const dir of paths)
{
    const target = path.join(dirName, '..', `${dir}.monaco-type`);

    if(fs.existsSync(target))
    {
        fs.unlinkSync(target);
    }

    createSymlink(path.join(dirName, '..', `${dir}.${extension}`), target);
}
