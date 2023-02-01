import {Provider} from '@angular/core';
import {RELATIONS_DEBUGGER_TYPE} from '@anglr/dynamic/relations';

import {RelationsDebuggerImpl} from '../services';

/**
 * Provides relations debugger implementation
 */
export function provideRelationsDebuggerImplementation(): Provider[]
{
    return [
        {
            provide: RELATIONS_DEBUGGER_TYPE,
            useValue: RelationsDebuggerImpl,
        },
    ];
}