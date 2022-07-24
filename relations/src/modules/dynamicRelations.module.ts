import {ModuleWithProviders, NgModule} from '@angular/core';

import {provideRelations} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic relations rendering
 */
@NgModule(
{
})
export class DynamicRelationsModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicRelationsModule extended with providers
     */
    public static withProviders(): ModuleWithProviders<DynamicRelationsModule>
    {
        return {
            ngModule: DynamicRelationsModule,
            providers:
            [
                provideRelations(),
            ]
        };
    }
}