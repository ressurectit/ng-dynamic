import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleRoutes} from '@anglr/common/router';
import {DynamicRelationsModule} from '@anglr/dynamic/relations';

import {components} from './relationsStatic.routes';
import {RelationsResultSAComponent, RelationsSampleClickSAComponent} from '../../components';

/**
 * Module for relations with static components samples
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        RelationsSampleClickSAComponent,
        RelationsResultSAComponent,
        DynamicRelationsModule,
    ],
    declarations:
    [
        ...components,
    ],
})
@ModuleRoutes(components)
export class RelationsStaticModule
{
}