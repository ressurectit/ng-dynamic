import {ModuleWithProviders, NgModule} from '@angular/core';
import {DynamicLayoutModule} from '@anglr/dynamic/layout';
import {DynamicRelationsModule} from '@anglr/dynamic/relations';

import {provideLayoutRelations} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic layout relations rendering
 */
@NgModule(
{
    exports:
    [
        DynamicLayoutModule,
        DynamicRelationsModule,
    ]
})
export class DynamicLayoutRelationsModule
{
    //######################### public methods #########################

    /**
     * Creates DynamicLayoutRelationsModule extended with providers
     */
    public static withProviders(): ModuleWithProviders<DynamicLayoutRelationsModule>
    {
        return {
            ngModule: DynamicLayoutRelationsModule,
            providers:
            [
                provideLayoutRelations(),
            ]
        };
    }
}