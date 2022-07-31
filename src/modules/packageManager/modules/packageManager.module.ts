import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {PackageManagerComponent} from '../components';

/**
 * Module for package manager components, directives and pipes
 */
@NgModule(
{
    imports:
    [
        CommonModule,
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