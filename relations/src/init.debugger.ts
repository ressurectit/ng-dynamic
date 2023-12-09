import {globalDefine, isBlank} from '@jscrpt/common';

declare global 
{
    const ngRelationsDebugger: boolean;
}

//TODO: sideeffect

globalDefine(global =>
{
    if(isBlank(global.ngRelationsDebugger))
    {
        global.ngRelationsDebugger = true;
    }
});