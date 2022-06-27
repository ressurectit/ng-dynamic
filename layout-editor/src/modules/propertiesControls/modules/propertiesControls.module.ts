import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormPipesModule} from '@anglr/common/forms';

import {DefaultGenericPropertiesControlComponent} from '../components';
import {PropertyTypeControlsModule} from '../../propertyTypeControls';
import {PropertiesControlRendererDirective} from '../directives';

/**
 * Module for properties controls components
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        PropertyTypeControlsModule,
        FormPipesModule,
    ],
    declarations:
    [
        DefaultGenericPropertiesControlComponent,
        PropertiesControlRendererDirective,
    ],
    exports:
    [
        DefaultGenericPropertiesControlComponent,
        PropertiesControlRendererDirective,
    ]
})
export class PropertiesControlsModule
{
}