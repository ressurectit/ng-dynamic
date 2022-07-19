import {DynamicModuleDataExtractorFn} from '@anglr/dynamic';

import {RelationsNodeDef} from '../types';

/**
 * Extracts dynamic relations node from registered component
 */
export const registeredComponentRelationsNodeExtractor: DynamicModuleDataExtractorFn<RelationsNodeDef> = (module, logger) =>
{
    console.log(module);

    logger?.debug('registeredComponentRelationsNodeExtractor: trying to extract dynamic node');

    return null;
};