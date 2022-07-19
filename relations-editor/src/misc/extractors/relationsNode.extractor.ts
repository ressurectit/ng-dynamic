import {DynamicModuleDataExtractorFn} from '@anglr/dynamic';
import {relationsExportExtractor} from '@anglr/dynamic/relations';
import {resolvePromiseOr} from '@jscrpt/common';

import {RelationsEditorMetadataType} from '../../decorators';
import {RelationsNodeDef} from '../types';

// /**
//  * Module with relations exports
//  */
// interface ɵDynamicModuleWithRelations extends DynamicModule
// {
//     /**
//      * Default export value
//      */
//     default?: Type<RelationsComponent>;

//     /**
//      * Relations named export value
//      */
//     relations?: Type<RelationsComponent>;
// }

/**
 * Extracts dynamic relations node from default locations
 */
export const relationsNodeExtractor: DynamicModuleDataExtractorFn<RelationsNodeDef> = async (module, logger) =>
{
    const relations = await resolvePromiseOr(relationsExportExtractor(module, logger));

    logger?.debug('relationsNodeExtractor: trying to extract dynamic node');

    if(!relations)
    {
        return null;
    }

    const nodeMeta = relations.data as RelationsEditorMetadataType;
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