import {globalDefine, isBlank} from '@jscrpt/common';

declare global 
{
    const ngRelationsDebugger: boolean;
}

globalDefine(global =>
{
    if(isBlank(global.ngRelationsDebugger))
    {
        global.ngRelationsDebugger = true;
    }
});