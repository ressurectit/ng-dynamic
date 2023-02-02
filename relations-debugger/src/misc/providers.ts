import {ClassProvider} from '@angular/core';
import {RELATIONS_NODES_PROVIDERS} from '@anglr/dynamic/relations-editor';

import {RelationsDebuggerDynamicModuleItemsProvider} from '../services';

/**
 * Provider for relations debugger package relations nodes provider
 */
export const RELATIONS_DEBUGGER_RELATIONS_NODES_PROVIDER: ClassProvider =
{
    provide: RELATIONS_NODES_PROVIDERS,
    useClass: RelationsDebuggerDynamicModuleItemsProvider,
    multi: true
};
