import {Inject, Injectable} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

/**
 * Dynamic module relations types provider, for custom relations types
 */
@Injectable()
export class CustomRelationsDynamicModuleRelationsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) protected logger: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with custom components
        if(source.package != 'custom-relations')
        {
            return null;
        }

        this.logger.debug('CustomRelationsDynamicModuleRelationsProvider: trying to get relations types {{@item}}', {item: {name: source.name, package: source.package}});

        return {
            default: [
                'relationsInputs',
                'relationsOutputs',
            ]
        };
    }
}