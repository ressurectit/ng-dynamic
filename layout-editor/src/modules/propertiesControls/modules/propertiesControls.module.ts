import {NgModule} from '@angular/core';

import {ComponentStylingPropertiesControlComponent, DefaultGenericPropertiesControlComponent, MarginControlComponent, PaddingControlComponent} from '../components';
import {PropertiesControlRendererDirective} from '../directives';

/**
 * Module for properties controls components
 */
@NgModule(
{
    imports:
    [
        MarginControlComponent,
        PaddingControlComponent,
        PropertiesControlRendererDirective,
        DefaultGenericPropertiesControlComponent,
        ComponentStylingPropertiesControlComponent,
    ],
    exports:
    [
        MarginControlComponent,
        PaddingControlComponent,
        PropertiesControlRendererDirective,
        DefaultGenericPropertiesControlComponent,
        ComponentStylingPropertiesControlComponent,
    ],
})
export class PropertiesControlsModule
{
}
