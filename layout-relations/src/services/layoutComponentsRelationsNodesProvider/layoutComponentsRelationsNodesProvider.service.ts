import {Inject, Injectable} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemSource, DynamicModule, DynamicModuleProvider} from '@anglr/dynamic';

import {LayoutComponentsRegister} from '../layoutComponentsRegister/layoutComponentsRegister.service';

/**
 * Dynamic relations nodes provider for layout components
 */
@Injectable()
export class LayoutComponentsRelationsNodesProvider implements DynamicModuleProvider
{
    //######################### constructor #########################
    constructor(protected componentsRegister: LayoutComponentsRegister,
                @Inject(LOGGER) protected logger: Logger,)
    {
    }

    //######################### public methods - implementation of DynamicItemLoaderProvider #########################

    /**
     * @inheritdoc
     */
    public async tryToGet(source: DynamicItemSource): Promise<DynamicModule|null>
    {
        //only works with layout components
        if(source.package != 'layout-components')
        {
            return null;
        }

        this.logger.debug('LayoutComponentsRelationsNodesProvider: trying to get node {{@item}}', {item: {name: source.name, package: source.package}});

        const type = await this.componentsRegister.getType(source.name);
        
        if(!type)
        {
            return null;
        }

        //TODO: add type for return

        const displayName = await this.componentsRegister.getDisplayName(source.name);
        const scope = await this.componentsRegister.getScope(source.name);
        const name = await this.componentsRegister.getComponentName(source.name);
        const packageName = await this.componentsRegister.getComponentPackage(source.name);

        return {
            default: type,
            displayName,
            scope,
            name,
            package: packageName,
        };
    }
}