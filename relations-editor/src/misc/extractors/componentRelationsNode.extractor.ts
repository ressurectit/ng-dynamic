import {Type} from '@angular/core';
import {DynamicModule, DynamicModuleDataExtractorFn} from '@anglr/dynamic';

import {RelationsNodeDef} from '../types';
import {RelationsEditorMetadataType} from '../../decorators';

/**
 * Module with default export
 */
interface ɵDynamicModuleWithDefault<TData = any> extends DynamicModule
{
    /**
     * Default export value
     */
    default?: TData;
}

/**
 * Extracts dynamic relations node from component relations node
 */
export const componentRelationsNodeExtractor: DynamicModuleDataExtractorFn<RelationsNodeDef> = async (module, logger) =>
{
    const localModule = module as ɵDynamicModuleWithDefault<Type<any>>;
    
    logger?.debug('componentRelationsNodeExtractor: trying to extract dynamic node');

    if(!localModule)
    {
        return null;
    }

    const nodeMeta = localModule.default as RelationsEditorMetadataType;

    if(!nodeMeta)
    {
        return null;
    }

    const metadata = await nodeMeta.relationsEditorMetadata;
    
    if(!metadata)
    {
        return null;
    }

    return {
        data: metadata.nodeDefinition,
        metaInfo: metadata.metaInfo,
    };
};