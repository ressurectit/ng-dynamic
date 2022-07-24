import {ModuleWithProviders, NgModule} from '@angular/core';
import {DynamicLayoutModule, provideLayout} from '@anglr/dynamic/layout';
import {DynamicRelationsModule, provideRelations} from '@anglr/dynamic/relations';

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
                provideLayout(),
                provideRelations(),
            ]
        };
    }
}