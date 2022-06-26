import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DefaultGenericPropertiesControlComponent} from '../components';

/**
 * Module for properties controls components
 */
@NgModule(
{
    imports:
    [
        CommonModule,
    ],
    declarations:
    [
        DefaultGenericPropertiesControlComponent,
    ],
    exports:
    [
        DefaultGenericPropertiesControlComponent,
    ]
})
export class PropertiesControlsModule
{
}