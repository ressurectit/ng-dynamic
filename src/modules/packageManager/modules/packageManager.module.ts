import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {PackageManagerComponent} from '../components';
import {WithoutUsedPipe} from '../pipes';

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
        WithoutUsedPipe,
    ],
    exports:
    [
        PackageManagerComponent,
        WithoutUsedPipe,
    ]
})
export class PackageManagerModule
{
}