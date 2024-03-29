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

    /**
     * Display name of layout component
     */
    displayName?: string;

    /**
     * Current scope of node that is being used
     */
    scope?: string;

    /**
     * Component name
     */
    name?: string;

    /**
     * Component package
     */
    package?: string;
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
        singleton: true,
        displayName: localModule.displayName,
        scope: localModule.scope,
        name: localModule.name,
        package: localModule.package,
    };
};