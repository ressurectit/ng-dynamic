import {inject} from '@angular/core';
import {DynamicItemLoader} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';

import {RELATIONS_NODES_PROVIDERS, RELATIONS_NODES_DATA_EXTRACTORS, RELATIONS_MODULE_TYPES_PROVIDERS, RELATIONS_MODULE_TYPES_DATA_EXTRACTORS} from './tokens';
import {RelationsModuleTypes, RelationsNodeDef} from './types';
import {isRelationsModuleTypes, isRelationsNodeDef} from './utils';

/**
 * Factory function for relations node loader provider
 */
export const relationsNodeLoaderFactory = (): DynamicItemLoader<RelationsNodeDef> =>
{
    return new DynamicItemLoader(inject(RELATIONS_NODES_PROVIDERS),
                                 inject(RELATIONS_NODES_DATA_EXTRACTORS),
                                 isRelationsNodeDef,
                                 inject(LOGGER, {optional: true}) ?? undefined);
};

/**
 * Factory function for relations module types loader provider
 */
export const relationsModuleTypesLoaderFactory = (): DynamicItemLoader<RelationsModuleTypes> =>
{
    return new DynamicItemLoader(inject(RELATIONS_MODULE_TYPES_PROVIDERS),
                                 inject(RELATIONS_MODULE_TYPES_DATA_EXTRACTORS),
                                 isRelationsModuleTypes,
                                 inject(LOGGER, {optional: true}) ?? undefined);
};