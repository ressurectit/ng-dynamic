import createSymlink from 'create-symlink';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import path from 'path';
import fs from 'fs';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;
const dirName = dirname(fileURLToPath(import.meta.url));

const paths = 
[
    'basic-components/src/dynamicItems/transformData/transformData.interface',
    'basic-components/src/dynamicItems/state/state.interface',
];

for(const dir of paths)
{
    const source = path.join(dirName, '..', `${dir}.ts`);
    const target = path.join(dirName, '..', `${dir}.monaco-type`);

    if(fs.existsSync(target))
    {
        fs.unlinkSync(target);
    }

    if(argv.start)
    {
        createSymlink(source, target);
    }
    else
    {
        const content = fs.readFileSync(source);
        fs.writeFileSync(target, content);

        console.log(`File '${source}' copied to '${target}'!`);
    }
}
