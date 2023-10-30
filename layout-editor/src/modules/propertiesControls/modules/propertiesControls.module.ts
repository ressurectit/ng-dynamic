import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CastPipesModule, FirstUppercaseLocalizeSAPipe, TooltipModule} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';

import {ComponentStylingPropertiesControlComponent, DefaultGenericPropertiesControlComponent, MarginControlComponent, PaddingControlComponent} from '../components';
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
        CastPipesModule,
        FirstUppercaseLocalizeSAPipe,
    ],
    declarations:
    [
        ComponentStylingPropertiesControlComponent,
        DefaultGenericPropertiesControlComponent,
        MarginControlComponent,
        PaddingControlComponent,
        PropertiesControlRendererDirective,
    ],
    exports:
    [
        ComponentStylingPropertiesControlComponent,
        DefaultGenericPropertiesControlComponent,
        MarginControlComponent,
        PaddingControlComponent,
        PropertiesControlRendererDirective,
    ]
})
export class PropertiesControlsModule
{
}