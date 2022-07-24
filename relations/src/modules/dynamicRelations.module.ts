import {NgModule} from '@angular/core';

import {provideRelations} from '../misc/utils';

/**
 * Module contains components, directives, pipes for dynamic relations rendering
 */
@NgModule(
{
    providers:
    [
        provideRelations(),
    ]
})
export class DynamicRelationsModule
{
}