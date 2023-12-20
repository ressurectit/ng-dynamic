import {Inject, Injectable, Optional} from '@angular/core';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';
import {Logger, LOGGER} from '@anglr/common';

import {CustomRelationsRegister} from '../customRelationsRegister/customRelationsRegister.service';

/**
 * Dynamic module items provider for custom relations module items
 */
@Injectable()
export class CustomRelationsDynamicModuleItemsProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(@Inject(LOGGER) protected logger: Logger,
                @Optional() protected customRelationsRegister?: CustomRelationsRegister,)
    {
    }

    //######################### public methods - implementation of DynamicModuleProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with custom relations
        if(source.package != 'custom-relations')
        {
            return null;
        }

        this.logger.debug('CustomRelationsDynamicModuleItemsProvider: trying to get node {{@item}}', {item: {name: source.name, package: source.package}});

        switch(source.name)
        {
            case 'relationsInputs':
            {
                const relationsInputs = await import('../../dynamicItems/componentInputs/type');

                if(!relationsInputs)
                {
                    return null;
                }

                const resultType = 
                {   
                    ...relationsInputs,
                    displayName: 'Relations inputs',
                    description: 'Definition of relations inputs',
                    group: 'Relations',
                };

                Object.freeze(resultType);

                return resultType;
            }
            case 'relationsOutputs':
            {
                const relationsOutputs = await import('../../dynamicItems/componentOutputs/type');

                if(!relationsOutputs)
                {
                    return null;
                }

                const resultType = 
                {   
                    ...relationsOutputs,
                    displayName: 'Relations outputs',
                    description: 'Definition of relations outputs',
                    group: 'Relations',
                };

                Object.freeze(resultType);

                return resultType;
            }
            default:
            {
                const customRelations = await import('../../dynamicItems/customRelation/type');
                const customRelationsConfiguration = await this.customRelationsRegister?.getConfigurationForComponent(source.name);
                
                const resultType = 
                {   
                    ...customRelations,
                    displayName: customRelationsConfiguration?.displayName,
                    description: customRelationsConfiguration?.description,
                    group: customRelationsConfiguration?.group,
                };

                Object.freeze(resultType);

                return resultType;
            }
        }
    }
}