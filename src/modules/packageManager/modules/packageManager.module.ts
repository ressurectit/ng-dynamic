import {NgModule} from '@angular/core';

import {PackageManagerComponent} from '../components';

/**
 * Module for package manager components, directives and pipes
 */
@NgModule(
{
    imports:
    [
        PackageManagerComponent,
    ],
    exports:
    [
        PackageManagerComponent,
    ],
})
export class PackageManagerModule
{
}
