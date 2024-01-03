import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {PackageManagerComponent} from '../components';

/**
 * Module for package manager components, directives and pipes
 */
@NgModule(
{
    imports:
    [
        ReactiveFormsModule,
    ],
    declarations:
    [
        PackageManagerComponent,
    ],
    exports:
    [
        PackageManagerComponent,
    ]
})
export class PackageManagerModule
{
}