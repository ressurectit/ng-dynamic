import {Inject, Injectable, Optional, Type} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemDefData, DynamicModule, DynamicModuleDataExtractor} from '@anglr/dynamic';
import {isPresent, isType} from '@jscrpt/common';

import {RelationsComponent} from '../../interfaces';
import {isRelationsComponentType} from '../../decorators';

/**
 * Module with relations exports
 */
interface ɵDynamicModuleWithRelations extends DynamicModule
{
    /**
     * Default export value
     */
    default?: Type<RelationsComponent>;

    /**
     * Relations named export value
     */
    relations?: Type<RelationsComponent>;
}

/**
 * Extracts dynamic relations from default locations
 * 
 * - relations export
 * - default export
 */
@Injectable()
export class DefaultDynamicModuleRelationsExtractor implements DynamicModuleDataExtractor<DynamicItemDefData<RelationsComponent>>
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicModuleDataExtractor #########################

    /**
     * @inheritdoc
     */
    public tryToExtract(module: DynamicModule): DynamicItemDefData<RelationsComponent>|null
    {
        const localModule = module as ɵDynamicModuleWithRelations;

        this._logger?.debug('DefaultDynamicModuleRelationsExtractor: trying to extract dynamic relations');

        //TODO: add some static data to type that identifies it as relationsComponent

        if(isPresent(localModule.relations) && isType(localModule.relations) && isRelationsComponentType(localModule.relations))
        {
            return {
                data: localModule.relations
            };
        }

        if(isPresent(localModule.default) && isType(localModule.default) && isRelationsComponentType(localModule.default))
        {
            return {
                data: localModule.default
            };
        }

        return null;
    }
}