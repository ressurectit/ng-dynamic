import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

import * as debuggerNode from '../../dynamicItems/debuggerNode/type';

/**
 * Dynamic module items provider for relations debugger module items
 */
@Injectable()
export class RelationsDebuggerDynamicModuleItemsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        switch(source.package)
        {
            case 'relations-debugger':
            {
                return debuggerNode;
            }
            default:
            {
                return null;
            }
        }
    }
}