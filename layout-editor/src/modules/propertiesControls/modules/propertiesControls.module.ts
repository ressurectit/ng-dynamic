import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {DefaultGenericPropertiesControlComponent, MarginControlComponent} from '../components';
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
        TooltipModule,
        PropertyTypeControlsModule,
        FormPipesModule,
    ],
    declarations:
    [
        DefaultGenericPropertiesControlComponent,
        MarginControlComponent,
        PropertiesControlRendererDirective,
    ],
    exports:
    [
        DefaultGenericPropertiesControlComponent,
        MarginControlComponent,
        PropertiesControlRendererDirective,
    ]
})
export class PropertiesControlsModule
{
}