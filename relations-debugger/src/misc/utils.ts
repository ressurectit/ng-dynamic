import {Provider} from '@angular/core';
import {RELATIONS_DEBUGGER_TYPE} from '@anglr/dynamic/relations';

import {RelationsDebuggerImpl} from '../services';
import {RELATIONS_DEBUGGER_RELATIONS_NODES_PROVIDER} from './providers';

/**
 * Provides relations debugger implementation
 */
export function provideRelationsDebuggerImplementation(): Provider[]
{
    return [
        RELATIONS_DEBUGGER_RELATIONS_NODES_PROVIDER,
        // DEFAULT_RELATIONS_NODES_EXTRACTOR,
        // RELATIONS_NODES_LOADER_PROVIDER,
        {
            provide: RELATIONS_DEBUGGER_TYPE,
            useValue: RelationsDebuggerImpl,
        },
    ];
}